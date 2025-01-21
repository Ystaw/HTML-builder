const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const outputFile = path.join(__dirname, 'project-dist', 'bundle.css');

fs.writeFileSync(outputFile, '', (err) => {
    if (err) throw err;
});

fs.readdir(stylesDir, { withFileTypes: true }, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
        if (file.isFile() && path.extname(file.name) === '.css') {
            const filePath = path.join(stylesDir, file.name);
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) throw err;
                fs.appendFile(outputFile, data + '\n', (err) => {
                    if (err) throw err;
                });
            });
        }
    });
});