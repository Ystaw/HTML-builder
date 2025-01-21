const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'files');
const copDir = path.join(__dirname, 'files-copy');

async function copyDir() {
    try {
        await fs.promises.mkdir(copDir, { recursive: true });

        const sourceFiles = await fs.promises.readdir(sourceDir);

        const copyFiles = await fs.promises.readdir(copDir);

        for (const file of copyFiles) {
            if (!sourceFiles.includes(file)) {
                const filePath = path.join(copDir, file);
                await fs.promises.unlink(filePath);
            }
        }

        for (const file of sourceFiles) {
            const srcFile = path.join(sourceDir, file);
            const destFile = path.join(copDir, file);
            await fs.promises.copyFile(srcFile, destFile);
        }

        console.log('Files copied successfully!');
    } catch (err) {
        console.error('Error:', err);
    }
}

copyDir();