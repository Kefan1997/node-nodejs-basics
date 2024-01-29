import { Transform } from 'stream';

class ReverseTransform extends Transform {
    _transform(chunk, encoding, callback) {
        const reversedChunk = chunk.toString().split('').reverse().join('');

        this.push(reversedChunk);
        callback();
    }
}

const transform = async () => {
    const reverseTransform = new ReverseTransform();

    process.stdin.pipe(reverseTransform).pipe(process.stdout);

    process.stdin.on('end', () => {
        console.log('\nText reversal completed.')
    })

    process.stdin.on('error', (error) => {
        console.error(`Error reading from stdin: ${error.message}`);
      });
    
      process.stdout.on('error', (error) => {
        console.error(`Error writing to stdout: ${error.message}`);
      });
};

await transform();