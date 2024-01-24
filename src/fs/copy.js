import * as fs from 'fs';

const copy = async () => {
  const copyFolderPath = './src/fs/files_copy';
  const sourceFolderPath = './src/fs/files';

  try {
    if (!fs.existsSync(sourceFolderPath) || fs.existsSync(copyFolderPath)) {
      throw new Error('FS operation failed');
    }

    fs.cpSync(sourceFolderPath, copyFolderPath, {
      recursive: true,
    });
  } catch (error) {
    throw error;
  }
};

await copy();
