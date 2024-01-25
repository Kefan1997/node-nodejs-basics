import { promises as fsPromises } from 'fs';

import { getPath, doesPathExist, OperationError } from '../helpers/index.js';

const list = async () => {
  const folderName = 'files';

  const pathToTheFolder = getPath(import.meta.url, folderName);
  const isPathExist = await doesPathExist(pathToTheFolder);

  try {
    if (!isPathExist) {
      OperationError();
    }

    const files = await fsPromises.readdir(pathToTheFolder);

    console.log('Array with files', files);
  } catch (err) {
    throw err;
  }
};

await list();
