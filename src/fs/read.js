import { promises as fsPromises } from 'fs';

const doesFileExist = async (path) => {
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

const read = async () => {
  const pathToFile = './src/fs/files/fileToRead.txt';
  try {
    const isFileExist = await doesFileExist(pathToFile);

    if (!isFileExist) {
      throw new Error('FS operation failed');
    }

    const content = await fsPromises.readFile(pathToFile, 'utf-8');

    console.log(content);
  } catch (err) {
    throw err;
  }
};

await read();
