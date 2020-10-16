import fs from 'fs';
import nconf from '../config/EnvironmentVariables';

class FileSystemHelper {
    readJsonFile(fileName) {
        return JSON.parse(
            fs.readFileSync(
                `${nconf.get('JSON_BASE_FILES_PATH')}${fileName}.json`,
            ),
        );
    }
}

export const fsHelper = new FileSystemHelper();
