import { writeFile } from 'node:fs';

import { getPath, doesPathExist, operationFail } from '../helpers/index.js';

const create = async () => {
  const content = 'I am fresh and young';
  const path = getPath(import.meta.url, 'files', 'fresh.txt');

  const fileExist = await doesPathExist(path);

  if (fileExist) {
    operationFail();

    return;
  }

  await writeFile(path, content, (err) => {
    if (err) {
      throw err;
    } else {
      console.log('File written successfully');
    }
  });
};

await create();
