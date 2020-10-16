import Ajv from 'ajv';

let ajv = new Ajv({ allErrors: true });

class SchemaValidatorHelper {
    validateSchema(schema, data) {
        var valid = ajv.validate(schema, data);
        if (!valid) {
            return ajv.errors;
        } else {
            return true;
        }
    }
}

export const schemaValidatorHelper = new SchemaValidatorHelper();
