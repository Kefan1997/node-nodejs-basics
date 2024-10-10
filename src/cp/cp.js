import { spawn } from 'child_process';

import { getPath } from "../helpers/index.js";

const spawnChildProcess = async (args) => {
    const childPath = getPath(import.meta.url, 'files', 'script.js');

    const child = spawn('node', [childPath, ...args], {
        stdio: ['pipe', 'pipe', 'inherit']
    })

    process.stdin.pipe(child.stdin);
    child.stdout.pipe(process.stdout);

    child.on('close', (code) => {
        console.log(`Child process exited with code ${code}`)
    })
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['arg1', 'arg2', 'arg3']);
