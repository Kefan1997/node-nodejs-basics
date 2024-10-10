import fsPromises from 'node:fs/promises';

import { getPath, doesPathExist, operationFail } from '../helpers/index.js';

const remove = async () => {
  const pathFile = getPath(import.meta.url, 'files', 'fileToRemove.txt');
  const isFileExist = await doesPathExist(pathFile);

  if (!isFileExist) {
    operationFail();

    return;
  }

  await fsPromises.rm(pathFile);
};

await remove();
