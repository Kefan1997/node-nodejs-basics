import { createReadStream } from 'fs';
import { createHash } from 'crypto';

import { getPath } from '../helpers/index.js';

const calculateHash = async () => {
  const folderName = 'files';
  const fileToCalculateHashFor = 'fileToCalculateHashFor.txt';
  const sha256 = 'sha256';

  const pathToTheFile = getPath(import.meta.url, folderName, fileToCalculateHashFor);

  const hash = createHash(sha256);
  const stream = createReadStream(pathToTheFile);

  stream.on('data', (data) => {
    hash.update(data);
  });

  stream.on('end', () => {
    const sha256Hash = hash.digest('hex');
    console.log(`SHA256 Hash for ${fileToCalculateHashFor}: ${sha256Hash}`);
  });

  stream.on('error', (error) => {
    console.error(`Error reading file: ${error.message}`);
  });
};

await calculateHash();
