import { promises as fsPromises } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export const getPath = (path, directoryName, fileName = '') => {
  try {
    return join(dirname(fileURLToPath(path)), directoryName, fileName);
  } catch (err) {
    throw err;
  }
};

export const doesPathExist = async (path) => {
  try {
    console.log('path', path);
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

export const OperationError = () => {
  throw new Error('FS operation failed');
};
