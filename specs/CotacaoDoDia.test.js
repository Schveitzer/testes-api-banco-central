/* eslint-disable prefer-destructuring */
import { clienteHelper } from '../helpers/Cliente.helper';
import { StatusCodes } from 'http-status-codes/build/es';
import { fsHelper } from '../helpers/FileSystem.helper';
import { schemaValidatorHelper } from '../helpers/Schemavalidator.helper';
import moment from 'moment-timezone';

let client;
let endpoint;
let dataAtual;
let regexPadraoMonetario;

// Inicia o cliente padrão e define as variáveis comuns a todos os testes.
beforeAll(async () => {
    client = await clienteHelper.getClient();
    endpoint = 'CotacaoDolarDia(dataCotacao=@dataCotacao)';
    dataAtual = moment(new Date()).tz('America/Sao_Paulo').format('MM-DD-YYYY'); // Data Atual Ex: 10-25-2020
    regexPadraoMonetario = /^(\d)+(\.\d{1,4})$/; // Padrão de número monetário Ex: 4,2345
});

describe('Testes para o endpoint de cotações do dia, Endpoint: /CotacaoDolarDia(dataCotacao=@dataCotacao) ', () => {
    it('GET - Verifica se a cotação para uma data passada não é um valor negativo ', async () => {
        const params = { '@dataCotacao': `'10-15-2018'`, $format: 'json' };
        const request = await client
            .get(endpoint)
            .query(params)
            .expect(StatusCodes.OK);
        const response = request.body.value;
        const cotacaoCompra = response[0].cotacaoCompra;
        const cotacaoVenda = response[0].cotacaoVenda;

        expect(cotacaoCompra).toBeGreaterThan(0);
        expect(cotacaoVenda).toBeGreaterThan(0);
    });

    it('GET - Verifica se o valor da cotação é separado por vírgula e se apresenta até quatro casas decimais ', async () => {
        const params = { '@dataCotacao': `'${dataAtual}'`, $format: 'json' };
        const request = await client
            .get(endpoint)
            .query(params)
            .expect(StatusCodes.OK);
        const response = request.body.value;
        const cotacaoCompra = String(response[0].cotacaoCompra);
        const cotacaoVenda = String(response[0].cotacaoVenda);

        // Caso haja falha no teste é lançado uma exceção para deixar mais claro o motivo da falha no relatório.
        try {
            expect(cotacaoCompra).toMatch(regexPadraoMonetario);
            expect(cotacaoVenda).toMatch(regexPadraoMonetario);
        } catch (e) {
            throw new Error(
                `O valor de cotação não correspondeu ao padrão esperado ex: 4,2345, Valores recebidos: Compra: ${cotacaoCompra} | Venda: ${cotacaoVenda} `,
            );
        }
    });

    it('GET - Verifica se a data da cotação recebida está correta para o período consultado ', async () => {
        const data = '2020-10-15';
        const params = { '@dataCotacao': `'10-15-2020'`, $format: 'json' };
        const request = await client
            .get(endpoint)
            .query(params)
            .expect(StatusCodes.OK);
        const response = request.body.value;
        const dataCotacao = String(response[0].dataHoraCotacao);

        expect(dataCotacao).toContain(data);
    });

    it('GET - Valida se os dados retornados estão corretos quando comparandos com o arquivo: cotacao_do_dia_10_05_2020.json ', async () => {
        const params = { '@dataCotacao': `'10-05-2020'`, $format: 'json' };
        const request = await client
            .get(endpoint)
            .query(params)
            .expect(StatusCodes.OK);
        const arquivoBase = fsHelper.readJsonFile('cotacao_do_dia_10_05_2020');

        expect(request.body).toEqual(arquivoBase);
    });

    it('GET - Valida o Json Schema verificando se a estrutura de dados do json recebido é o esperado', async () => {
        const params = { '@dataCotacao': `'${dataAtual}'`, $format: 'json' };
        const request = await client
            .get(endpoint)
            .query(params)
            .expect(StatusCodes.OK);
        const schemaBase = fsHelper.readJsonFile('schema_cotacao_do_dia');

        expect(
            schemaValidatorHelper.validateSchema(schemaBase, request.body),
        ).toBe(true);
    });

    it('GET - Verifica o retorno quando informado um ano que não existe ', async () => {
        const params = { '@dataCotacao': `'10-15-3520'`, $format: 'json' };
        const request = await client
            .get(endpoint)
            .query(params)
            .expect(StatusCodes.OK);
        const response = request.body.value;

        expect(response.length).toEqual(0);
    });
    
    it('GET - Verifica o retorno quando informado uma data que não possuí cotação no dia ', async () => {
        const params = { '@dataCotacao': `'10-17-2020'`, $format: 'json' };
        const request = await client
            .get(endpoint)
            .query(params)
            .expect(StatusCodes.OK);
        const response = request.body.value;

        expect(response.length).toEqual(0);
    });

    it('GET - Verifica o retorno com o formato text/plain ', async () => {
        const params = {
            '@dataCotacao': `'10-15-2020'`,
            $format: 'text/plain',
        };
        const request = await client
            .get(endpoint)
            .query(params)
            .expect(StatusCodes.OK);
        const response = request.text;

        expect(response).toEqual(
            'cotacaoCompra,cotacaoVenda,dataHoraCotacao\r\n"5,6166","5,6172",2020-10-15 13:04:30.297\r\n',
        );
    });

    it('GET - Verifica se é retornado erro 500 (INTERNAL_SERVER_ERROR) quando informado uma data no formato inválido ', async () => {
        const params = { '@dataCotacao': `'15-15-2020'`, $format: 'json' };
        const request = await client
            .get(endpoint)
            .query(params)
            .expect(StatusCodes.INTERNAL_SERVER_ERROR);
    });
});
