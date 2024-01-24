import { promises as fsPromises } from 'fs';

const list = async () => {
  const folderPathName = './src/fs/files';
  try {
    if (!fsPromises.access(folderPathName)) {
      throw new Error('FS operation failed');
    }

    const files = await fsPromises.readdir(folderPathName);

    console.log('Array with files', files);
  } catch (err) {
    throw err;
  }
};

await list();
