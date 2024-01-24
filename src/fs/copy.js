import { promises as fsPromises } from 'fs';
import path from 'path';

export const doesPathExist = async (path) => {
  try {
    await fsPromises.access(path);

    return true;
  } catch (err) {
    if ((err.code = 'ENOENT')) {
      return false;
    } else {
      throw err;
    }
  }
};


const copyFiles = async (sourcePath, destinationDir) => {
  try {
    const files = await fsPromises.readdir(sourcePath);

    files.forEach(async (file) => {
      const sourceFilePath = path.join(sourcePath, file);
      const destinationFilePath = path.join(destinationDir, file);

      await fsPromises.copyFile(sourceFilePath, destinationFilePath);
    });
  } catch (err) {
    throw err;
  }
};

const copy = async () => {
  const copyFolderPath = './src/fs/files_copy';
  const sourceFolderPath = './src/fs/files';
  try {
    const isSourcePathExist = await doesPathExist(sourceFolderPath);
    const isCopyPathExist = await doesPathExist(copyFolderPath);

    if (!isSourcePathExist || isCopyPathExist) {
      throw new Error('FS operation failed');
    }

    await fsPromises.mkdir(copyFolderPath, { recursive: true });

    await copyFiles(sourceFolderPath, copyFolderPath);
  } catch (error) {
    throw error;
  }
};

await copy();
