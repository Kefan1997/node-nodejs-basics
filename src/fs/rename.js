import fs from 'node:fs/promises';

import { getPath, doesPathExist, operationFail } from '../helpers/index.js';

const rename = async () => {
  try {
    const NEW_FILE_NAME = 'properFilename.md';
    const OLD_FILE_NAME = 'wrongFilename.txt';

    const newFileNamePath = getPath(import.meta.url, 'files', NEW_FILE_NAME);
    const newFileExist = await doesPathExist(newFileNamePath);
    const oldFileNamePath = getPath(import.meta.url, 'files', OLD_FILE_NAME);
    const oldFileExist = await doesPathExist(oldFileNamePath);

    if (newFileExist || !oldFileExist) {
      operationFail();

      return;
    }

    await fs.rename(oldFileNamePath, newFileNamePath);
  } catch (err) {
    throw err;
  }
};

await rename();
