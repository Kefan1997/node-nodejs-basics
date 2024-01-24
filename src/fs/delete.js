import * as fs from 'fs';

const remove = async () => {
    const pathToDeleteFile = './src/fs/files/fileToRemove.txt';

    try {
        if(!fs.existsSync(pathToDeleteFile)) {
            throw new Error('FS operation failed')
        }

        fs.unlinkSync(pathToDeleteFile);
    } catch (err) {
        throw err
    }
};

await remove();