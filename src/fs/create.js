import * as fs from 'fs';

const create = async () => {
  const filePath = './src/fs/files/fresh.txt';
  if (fs.existsSync(filePath)) {
    throw new Error('FS operation failed');
  }
  
  fs.appendFile(filePath, 'I am fresh and young', (error) => {
    if (error) throw error;
    console.log('Saved!');
  });
};

await create();
