import { Transform } from 'stream';

const transform = async () => {
  try {
    const reverseTransform = new Transform({
      transform(chunk, encoding, callback) {
        this.push(chunk.toString().split('').reverse().join(''));
        callback();
      },
    });

    process.stdin.pipe(reverseTransform).pipe(process.stdout);
  } catch (err) {
    console.error('An error occurred:', err.message);
  }
};

await transform();
