var fs = require('fs'),
    xml2js = require('xml2js');
var parser = new xml2js.Parser();
const CONSTANT = require('./constants').CONSTANTS;

async function readXmlFile(fullFileName) {
    return new Promise((resolve, reject) => {
        let featureToggles = new Set();
        fs.readFile(fullFileName, function (err, data) {
            parser.parseString(data, function (err, result) {
                //console.log(result.features.feature[1]['$'].uid);
                result.features.feature.forEach((f) => {
                    featureToggles.add(f);
                });
                resolve(featureToggles);
            });
        });
    });
}

async function readAllEnvsFeatureToggles() {
    let allEnvFt = {};
    for (const [key, value] of Object.entries(CONSTANT.featuretoggleRepo)) {
        let xmlOutput = await readXmlFile(CONSTANT.featureToggleBaseRepo + value + CONSTANT.folderSuffix + CONSTANT.fileName);
        allEnvFt[key] = xmlOutput;
    }
    return allEnvFt;
}

async function readAllTenantData() {
    let allEnvFt = {};
    for (const [key, value] of Object.entries(CONSTANT.featuretoggleRepo)) {
        let xmlOutput = await readXmlFile(CONSTANT.featureToggleBaseRepo + value + CONSTANT.folderSuffix + CONSTANT.fileName);
        allEnvFt[key] = xmlOutput;
    }
    return allEnvFt;
}


module.exports = {
    readXmlFile,
    readAllEnvsFeatureToggles
}
