const fs = require('fs')
const CONSTANTS = require('../util/constants').CONSTANTS;

function readData(filePath) {
    try {
        let applications = [];
        let fileNames = readDirectory(filePath);
        fileNames.forEach((fileName) => {
            let data = readFile(filePath, fileName)
            if (data != null && data != undefined) {
                applications.push(JSON.parse(data));
            }
        });
        return applications;
    } catch (err) {
        console.error(err)
    }
}

function readFile(filePath, fileName) {
    const data = fs.readFileSync(filePath + '/' + fileName, 'utf8')
    return data;
}

function readDirectory(filePath) {
    let fileNames = fs.readdirSync(filePath, 'utf8');
    return fileNames;
}


function writeData(path, data) {
    fs.writeFileSync(path, data);
}

module.exports = {
    readData,
    writeData,
    readFile
};