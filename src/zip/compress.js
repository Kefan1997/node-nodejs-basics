import { createGzip } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'stream/promises';

import { getPath } from '../helpers/index.js';

const compress = async () => {
  const filePath = getPath(import.meta.url, 'files', 'fileToCompress.txt');
  const newFilePath = getPath(import.meta.url, 'files', 'archive.gz');

  const gzip = createGzip();
  const source = createReadStream(filePath);
  const destination = createWriteStream(newFilePath);

  try {
    await pipeline(source, gzip, destination);
    console.log('File successfully compressed to archive.gz');
  } catch (err) {
    console.error('An error occurred:', err.message);
  }
};

await compress();
