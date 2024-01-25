import { promises as fsPromises } from 'fs';
import { join } from 'path';

import { doesPathExist, OperationError, getPath } from '../helpers/index.js';

const copyFiles = async (sourcePath, destinationDir) => {
  try {
    const files = await fsPromises.readdir(sourcePath);
    files.forEach(async (file) => {
      const sourceFilePath = join(sourcePath, file);
      const destinationFilePath = join(destinationDir, file);

      await fsPromises.copyFile(sourceFilePath, destinationFilePath);
    });
  } catch (err) {
    throw err;
  }
};

const copy = async () => {
  const sourceFolderName = 'files';
  const copyFolderName = 'files_copy';

  try {
    const sourceFolderPath = getPath(import.meta.url, sourceFolderName);
    const copyFolderPath = getPath(import.meta.url, copyFolderName);

    const isSourcePathExist = await doesPathExist(sourceFolderPath);
    const isCopyPathExist = await doesPathExist(copyFolderPath);

    if (!isSourcePathExist || isCopyPathExist) {
      OperationError();
    }

    await fsPromises.mkdir(copyFolderPath, { recursive: true });

    await copyFiles(sourceFolderPath, copyFolderPath);
  } catch (error) {
    throw error;
  }
};

await copy();
