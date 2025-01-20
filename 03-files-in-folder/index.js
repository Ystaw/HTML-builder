const fs = require('fs/promises');
const path = require('path');

async function displayFilesInfo() {
    try {
        const dirPath = path.join(__dirname, 'secret-folder');

        const dirents = await fs.readdir(dirPath, { withFileTypes: true });

        for (const dirent of dirents) {
            if (dirent.isFile()) {
                const filePath = path.join(dirPath, dirent.name);

                const stats = await fs.stat(filePath);

                const fileName = path.parse(dirent.name).name;
                const fileExt = path.extname(dirent.name).slice(1);
                const fileSize = (stats.size / 1024).toFixed(3);

                console.log(`${fileName} - ${fileExt} - ${fileSize}kb`);
            }
        }
    } catch (error) {
        console.error('Error', error);
    }
}

displayFilesInfo();