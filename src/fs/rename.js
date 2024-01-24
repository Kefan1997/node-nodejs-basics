import * as fs from 'fs';

const rename = async () => {
    const renamedFile = './src/fs/files/wrongFilename.txt';
    const newFileName = './src/fs/files/properFilename.md';

    try {
        if(!fs.existsSync(renamedFile) || fs.existsSync(newFileName)) {
            throw new Error('FS operation failed')
        }

        fs.renameSync(renamedFile, newFileName)
    } catch (err) {
        throw err
    }
};

await rename();