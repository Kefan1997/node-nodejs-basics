import { promises as fsPromises } from 'fs';

import { getPath, doesPathExist, OperationError } from '../helpers/index.js';

const rename = async () => {
  const folderName = 'files';
  const renamedFileName = 'wrongFilename.txt';
  const newFileName = 'properFilename.md';

  const pathToRenamedFile = getPath(import.meta.url, folderName, renamedFileName);
  const pathToNewFile = getPath(import.meta.url, folderName, newFileName);

  const isRenamedFileExist = await doesPathExist(pathToRenamedFile);
  const isNewFileExist = await doesPathExist(pathToNewFile);

  try {
    if (!isRenamedFileExist || isNewFileExist) {
      OperationError();
    }

    fsPromises.rename(pathToRenamedFile, pathToNewFile);
  } catch (err) {
    throw err;
  }
};

await rename();
