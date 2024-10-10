import path from 'node:path';
import { release, version } from 'node:os';
import { createServer as createServerHttp } from 'node:http';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';

import './files/c.js';

const random = Math.random();

let unknownObject;

console.log('random', random);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {
  try {
    const filePath = random > 0.5 ? `${__dirname}/files/a.json` : `${__dirname}/files/b.json`;
    const fileContent = await readFile(filePath, 'utf-8');
    unknownObject = JSON.parse(fileContent);
    console.log(unknownObject);
  } catch (err) {
    console.error('Ошибка при чтении файла', err);
  }
})();
console.log("random", random)


console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };
