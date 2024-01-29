import { spawn } from 'child_process';

import { getPath } from '../helpers/index.js';

const spawnChildProcess = async (args) => {
  const fileName = 'script.js';
  const folderName = 'files';
  const pathToFile = getPath(import.meta.url, folderName, fileName);
  const childProcess = spawn('node', [pathToFile, ...args]);

  childProcess.stdout.on('data', (data) => {
    process.stdout.write(data);
  });

  process.stdin.on('data', (data) => {
    childProcess.stdin.write(data);
  });
};

spawnChildProcess(['arg1', 'arg2']);
