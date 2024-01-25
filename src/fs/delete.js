import { promises as fsPromises } from 'fs';

import { getPath, doesPathExist, OperationError } from '../helpers/index.js';

const remove = async () => {
    const folderName = 'files';
    const fileNameToDelete = 'fileToRemove.txt';

    const pathToTheFile = getPath(import.meta.url, folderName, fileNameToDelete);
    const isFileExist = await doesPathExist(pathToTheFile);

    try {
        if(!isFileExist) {
            OperationError()
        }

        fsPromises.unlink(pathToTheFile);
    } catch (err) {
        throw err
    }
};

await remove();