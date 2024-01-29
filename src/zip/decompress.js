import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';

import { getPath } from '../helpers/index.js';

const decompress = async () => {
  const compressedFileName = 'archive.gz';
  const decompressedFileName = 'fileToCompress.txt';
  const folderName = 'files';

  const pathToCompressedFileName = getPath(import.meta.url, folderName, compressedFileName);
  const pathToDecompressedFileName = getPath(import.meta.url, folderName, decompressedFileName);

  const input = createReadStream(pathToCompressedFileName);
  const output = createWriteStream(pathToDecompressedFileName);
  const gunzip = createGunzip();

  input.pipe(gunzip).pipe(output);

  output.on('finish', () => {
    console.log(`File ${compressedFileName} compressed to ${decompressedFileName}`);
  });

  output.on('error', (error) => {
    console.error(`Error compressing file: ${error.message}`);
  });
};

await decompress();
