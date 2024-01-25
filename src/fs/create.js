import { promises as fsPromises } from 'fs';

import { doesPathExist, getPath, OperationError } from '../helpers/index.js';

const create = async () => {
  const folderName = 'files';
  const fileName = 'fresh.txt';
  const content = 'I am fresh and young';

  const pathToTheFile = getPath(import.meta.url, folderName, fileName);

  const isPathExist = await doesPathExist(pathToTheFile);

  if (isPathExist) {
    OperationError();
  }

  await fsPromises.writeFile(pathToTheFile, content);
};

await create();
