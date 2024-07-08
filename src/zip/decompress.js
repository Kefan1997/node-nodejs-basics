import { createGunzip } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'stream/promises';

import { getPath } from '../helpers/index.js';

const decompress = async () => {
  const archiveFilePath = getPath(import.meta.url, 'files', 'archive.gz');
  const decompressFilePath = getPath(import.meta.url, 'files', 'fileToCompressNew.txt');

  const gzip = createGunzip();
  const source = createReadStream(archiveFilePath);
  const destination = createWriteStream(decompressFilePath);

  try {
    await pipeline(source, gzip, destination);

    console.log('File successfully decompressed to archive.gz');
  } catch (err) {
    console.error('An error occurred:', err.message);
  }
};

await decompress();
