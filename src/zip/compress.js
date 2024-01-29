import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';

import { getPath } from '../helpers/index.js';

const compress = async () => {
  const fileToCompress = 'fileToCompress.txt';
  const compressedFileName = 'archive.gz';
  const folderName = 'files';

  const pathToTheFileCompress = getPath(import.meta.url, folderName, fileToCompress);
  const pathToTheCompressedFileName = getPath(import.meta.url, folderName, compressedFileName);

  const input = createReadStream(pathToTheFileCompress);
  const output = createWriteStream(pathToTheCompressedFileName);
  const gzip = createGzip();

  input.pipe(gzip).pipe(output)

  output.on('finish', () => {
    console.log(`File ${fileToCompress} compressed to ${compressedFileName}`);
  });

  output.on('error', (error) => {
    console.error(`Error compressing file: ${error.message}`);
  });
};

await compress();
