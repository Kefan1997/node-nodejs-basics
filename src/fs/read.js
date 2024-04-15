import { readFile } from 'node:fs/promises';

import { getPath, doesPathExist, operationFail } from '../helpers/index.js';

const read = async () => {
  const filePath = getPath(import.meta.url, 'files', 'fileToRead.txt');
  const isExist = doesPathExist(filePath);

  if (!isExist) {
    operationFail();

    return;
  }

  const content = await readFile(filePath, { encoding: 'utf8' });
  console.log(content);
};

await read();
