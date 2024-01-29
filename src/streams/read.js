import { createReadStream } from 'fs';

import { getPath } from '../helpers/index.js';

const read = async () => {
  const fileToRead = 'fileToRead.txt';
  const folderName = 'files';

  const pathToFileToRead = getPath(import.meta.url, folderName, fileToRead);

  const readableStream = createReadStream(pathToFileToRead, { encoding: 'utf8' });

  readableStream.on('data', (chunk) => {
    process.stdout.write(chunk);
  });

  readableStream.on('end', () => {
    console.log('\nFile reading completed.');
  });

  readableStream.on('error', (error) => {
    console.error(`Error reading file: ${error.message}`);
  });
};

await read();
