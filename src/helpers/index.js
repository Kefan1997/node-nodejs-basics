import { access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const getPath = (currentPath, folderName, fileName = '') => {
  try {
    const currentFile = fileURLToPath(currentPath);
    const currentDirName = dirname(currentFile);

    return join(currentDirName, folderName, fileName);
  } catch (err) {
    throw err;
  }
};

export const doesFileExist = async (path) => {
  try {
    await access(path);

    return true;
  } catch (err) {
    if (err.code === 'ENOENT') {
      return false;
    } else {
      throw err;
    }
  }
};

export const operationFail = () => {
  throw new Error('FS operation failed');
};
