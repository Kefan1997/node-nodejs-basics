import fsPromises from 'node:fs/promises';

import { getPath, doesPathExist, operationFail } from '../helpers/index.js';
import { join } from 'node:path';

const list = async () => {
  const dirPath = getPath(import.meta.url, 'files');
  const isDirExist = await doesPathExist(dirPath);

  if (!isDirExist) {
    operationFail();

    return;
  }

  const files = await fsPromises.readdir(dirPath);
  const fileNames = [];

  for (const file of files) {
    const fileInfo = await fsPromises.stat(join(dirPath, file));

    if (fileInfo.isFile()) {
      fileNames.push(file);
    }
  }

  console.log('files', fileNames);
};

await list();
