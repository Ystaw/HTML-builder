const fs = require('fs');
const path = require('path');
const readline = require('readline');

const outputPath = path.join(__dirname, 'output.txt');

const writeStream = fs.createWriteStream(outputPath, { flags: 'a' });

const readl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log('Hello! Enter something! Or type "exit" to quit.');

const handleInput = (input) => {
    if (input.trim().toLowerCase() === 'exit') {
        console.log('Bye!');
        readl.close();
        process.exit(0);
    } else {
        writeStream.write(`${input}\n`, (err) => {
            if (err) {
                console.error('Error writing to file:', err);
            } else {
                console.log('Success! Please enter more text or type "exit" to quit.');
            }
        });
    }
};

readl.on('line', handleInput);

process.on('SIGINT', () => {
    console.log('\nBye!');
    readl.close();
    writeStream.end(() => {
        process.exit(0);
    });
});