import { mkdir, readdir, copyFile } from 'node:fs/promises';
import { join } from 'node:path';

import { getPath, doesPathExist, operationFail } from '../helpers/index.js';

const copy = async () => {
  try {
    const DESTINATION_FOLDER_NAME = 'files_copy';
    const sourceFolderPath = getPath(import.meta.url, 'files');
    const sourceFolderExist = await doesPathExist(sourceFolderPath);

    if (!sourceFolderExist) {
      operationFail();

      return;
    }

    const destinationFolderPath = getPath(import.meta.url, DESTINATION_FOLDER_NAME);
    const destinationFolderExist = await doesPathExist(destinationFolderPath);

    if (destinationFolderExist) {
      operationFail();

      return;
    }

    await mkdir(destinationFolderPath);

    const files = await readdir(sourceFolderPath);

    await Promise.all(
      files.map(async (file) => {
        const sourceFilePath = join(sourceFolderPath, file);
        const destinationFilePath = join(destinationFolderPath, file);

        await copyFile(sourceFilePath, destinationFilePath);
      })
    );
  } catch (err) {
    throw err;
  }
};

await copy();
