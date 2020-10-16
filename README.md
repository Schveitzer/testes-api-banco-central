# Testes api Pública do Banco Central do Brasil

Projeto de testes automatizados para api Pública do Banco Central do Brasil

## Conteúdo

- [Estrutura do Projeto](#Estrutura-do-Projeto)
- [Requisitos](#Requisitos)
- [Iniciando](#Iniciando)
- [Executando os testes](#Para-executar-os-testes)
- [Relatório](#Relatório-de-execução)
- [Executando com Docker](#Executando-com-Docker)
- [Lint do código](#Lint-do-Código)

Esse projeto inclui:
- Framworks:
    - Supertest
    - Jest
- Features:
    - Data driven testes
    - Validação de Json Schema
    - Cliente http compartilhado
    - Execução com Docker 
    - ES6 style class-based approach
    - Formatador e lint de código (ESlint, Prettier)
    - Relatório em html

Estrutura do porjeto:
```
.
├── babel.config.js
├── base-files // Arquivos base usados para comparação nos testes
│   └── json
│       ├── cotacao_do_dia_10_05_2020.json
│       └── schema_cotacao_do_dia.json
├── config
│   ├── config.json // Contém as configurações como baseUrl e outras
│   └── EnvironmentVariables.js
├── Dockerfile
├── helpers // Coleção de classes com funções de apoio aos testes
│   ├── Cliente.helper.js //Cliente http compartilhado entre os testes
│   ├── FileSystem.helper.js
│   └── Schemavalidator.helper.js
├── jest.setup.js
├── LICENSE
├── Makefile
├── package.json
├── README.md
├── specs // Pasta que contém os arquivos de testes
│   └── CotacaoDoDIa.test.js //Arquivo com os testes automatizados
└── yarn.lock

```
    
## Requisitos
- node >= 12.18.x - [Como instalar o Node](https://nodejs.org/en/download/)
- yarn >= 1.21.x - [Como instalar o Yarn](https://yarnpkg.com/en/docs/install#debian-stable)
- Docker (Opcional) >= 18.09 - [Como instalar o Docker](https://docs.docker.com/get-docker/)

## Iniciando
Clonar o repositório:
```bash
$ git clone https://github.com/Schveitzer/testes-api-banco-central.git
$ cd testes-api-banco-central
```
Instalar as dependências:

```bash
$ yarn install
```

## Para executar os testes:
```bash
$ yarn init:tests
```

## Relatório de execução
```
Será gerado um relatório no formato html na pasta: /relatorios/report.html
```
## Executando com Docker

Para executar os testes usando docker:

Buildar a imagem:

```bash
$ make -i build
```

Executar os testes:

```bash
$ make test.run
```

Copiar o relatório gerado:
> O arquivo será copiado para a pasta /relatorios
```bash
$ make get.report
```
## Lint do Código
Para executar o lint do código execute:

```bash
$ yarn code:format
```

## Base url e outras configurações
As variaveis de ambiente usadas no testes são carregadas a partir do arquivo [EnvironmentVariables.js](https://github.com/Schveitzer/testes-api-banco-central/blob/master/config/EnvironmentVariables.js) , para alterar o endereço do base_url edite o endereço no arquivo [config.json](https://github.com/Schveitzer/testes-api-banco-central/blob/master/config/config.json).
