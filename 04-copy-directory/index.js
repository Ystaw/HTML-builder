const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'files');
const copDir = path.join(__dirname, 'files-copy');

async function copyDir() {
    try {
        await fs.promises.mkdir(copDir, { recursive: true });
    } catch (err) {
        console.error('Error', err);
        return;
    }
    try {
        const files = await fs.promises.readdir(sourceDir);
        for (const file of files) {
            const srcFile = path.join(sourceDir, file);
            const copFile = path.join(copDir, file);

            await fs.promises.copyFile(srcFile, copFile);
        }
        console.log('Files copied successfully!');
    } catch (err) {
        console.error('Error reading or copying files', err);
    }
}

copyDir();