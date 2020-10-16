import nconf from '../config/EnvironmentVariables';
import supertest from 'supertest';

const authorizations = {};

class ClienteHelper {
    async getClient() {
        return supertest(nconf.get('APP_BASE_URL'));
    }
}

export const clienteHelper = new ClienteHelper();
