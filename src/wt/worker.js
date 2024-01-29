import { parentPort } from 'worker_threads';

const nthFibonacci = (n) => (n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2));

parentPort.on('message', (n) => {
  try {
    parentPort.postMessage({ status: 'resolved', data: nthFibonacci(n) });
  } catch (error) {
    parentPort.postMessage({ status: 'error', data: null });
  }
});
