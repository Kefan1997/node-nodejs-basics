import { promises as fsPromises } from 'fs';

import { doesPathExist, OperationError, getPath } from '../helpers/index.js';

const read = async () => {
  const folderName = 'files';
  const fileName = 'fileToRead.txt';

  const pathToTheFile = getPath(import.meta.url, folderName, fileName);
  const isFileExist = await doesPathExist(pathToTheFile);

  try {
    if (!isFileExist) {
      OperationError();
    }

    const content = await fsPromises.readFile(pathToTheFile, 'utf-8');

    console.log(content);
  } catch (err) {
    throw err;
  }
};

await read();
