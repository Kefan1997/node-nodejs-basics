import { createReadStream } from 'node:fs';
import { finished } from 'node:stream/promises';

import { getPath } from '../helpers/index.js';

const read = async () => {
  const filePath = getPath(import.meta.url, 'files', 'fileToRead.txt');

  const readableStream = createReadStream(filePath, { encoding: 'utf8' });

  try {
    readableStream.pipe(process.stdout);

    await finished(readableStream);

    console.log('\nFinished reading file');
  } catch (err) {
    console.error('An error occurred:', err.message);
  }
};

await read();
