import os from 'node:os';
import { Worker } from 'node:worker_threads';

import { getPath } from '../helpers/index.js';

const performCalculations = async () => {
  const workerPath = getPath(import.meta.url, 'worker.js');

  const workers = os.cpus().map((el, index) => {
    return new Promise((resolve) => {
      const data = 10 + index;
      const worker = new Worker(workerPath, {
        workerData: { data },
      });

      worker.on('message', (message) => {
        console.log(`Received message from worker: ${message}`);

        resolve({ status: 'resolve', data });
      });

      worker.on('error', (error) => {
        console.error(`Worker error: ${error}`);

        resolve({ status: 'error', data: null });
      });

      worker.on('exit', (code) => {
        if (code !== 0) {
          console.error(`Worker stopped with exit code ${code}`);
        }
      });
    });
  });

  const result = await Promise.all(workers)

  result.forEach((worker, index) => console.log(`worker #${index + 1}`, worker));
};

await performCalculations();
