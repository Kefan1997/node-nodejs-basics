import { createWriteStream } from 'node:fs';
import { finished } from 'node:stream/promises';

import { getPath } from '../helpers/index.js';

const write = async () => {
  const filePath = getPath(import.meta.url, 'files', 'fileToWrite.txt');

  const writableStream = createWriteStream(filePath, { encoding: 'utf8' });

  try {
    process.stdin.pipe(writableStream);

    await finished(writableStream);

    console.log('\nFinished writable file');
  } catch (err) {
    console.error('An error occurred:', err.message);
  }
};

await write();
