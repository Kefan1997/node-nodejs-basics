import { createReadStream, createWriteStream } from 'node:fs';

import {getPath} from './index.js'

const readFilePath = getPath(import.meta.url, 'files', 'f.txt')
const writeFilePath = getPath(import.meta.url, 'files', 'f_copy.txt')

const readStream = createReadStream(readFilePath, { encoding: 'utf8' });
const writeStream = createWriteStream(writeFilePath);

readStream.pipe(writeStream);

writeStream.on('close', () => {
  console.log('File copy completed');
});
