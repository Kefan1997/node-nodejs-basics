import { createWriteStream } from 'fs';

import { getPath } from '../helpers/index.js';

const write = async () => {
  const fileToWrite = 'fileToWrite.txt';
  const folderName = 'files';

  const pathToFileToWrite = getPath(import.meta.url, folderName, fileToWrite);

  const writableStream = createWriteStream(pathToFileToWrite, { encoding: 'utf8' });

  process.stdin.setEncoding('utf-8');

  process.stdin.on('data', (chunk) => {
    if (chunk !== null) {
      writableStream.write(chunk);
    }
  });

  process.stdin.on('end', () => {
    writableStream.end();
    console.log(`Data written to ${fileToWrite}`);
  });

  process.stdin.on('error', (error) => {
    console.error(`Error reading from stdin: ${error.message}`);
  });

  writableStream.on('error', (error) => {
    console.error(`Error writing to file: ${error.message}`);
  });
};

await write();
