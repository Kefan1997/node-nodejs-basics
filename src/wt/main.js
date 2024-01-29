import * as os from 'os';
import { Worker } from 'worker_threads';

import { getPath } from '../helpers/index.js';

const performCalculations = async () => {
  const fileToRead = 'worker.js';
  const cpus = os.cpus();
  const pathToFile = getPath(import.meta.url, fileToRead);
  const result = [];

  cpus.map((_, i) => {
    const worker = new Worker(pathToFile);
    worker.on('message', (res) => {
      result.push(res);

      result.length === cpus.length && console.log(result);
    });

    worker.postMessage(i + 10);
  });
};

await performCalculations();
