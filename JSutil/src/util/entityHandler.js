const fileUtil = require('./fileUtil');
const xmlUtil = require('./xmlUtil');
const path = require('path');
const CONSTANTS = require('./constants').CONSTANTS;


function getApplications() {
    return fileUtil.readData(CONSTANTS.appPath);
}

function getCategories() {
    return fileUtil.readData(CONSTANTS.categoryPath);
}

function getDependencies() {
    return fileUtil.readData(CONSTANTS.dependencyPath);
}

function getFeatures() {
    return fileUtil.readData(CONSTANTS.featurePath);
}

function getPrivileges() {
    return fileUtil.readData(CONSTANTS.privilegePath);
}

function getApplicationWithFT() {
    let applicationWithFT = [];
    let applications = getApplications();
    applications.forEach((application) => {
        if (application.featureToggle && application.status === 'INACTIVE') {
            applicationWithFT.push(application);
        }
    });
    return applicationWithFT;
}

function getDependencyWithFT() {
    let dependencyWithFT = [];
    let dependencies = getDependencies();
    dependencies.forEach((dependency) => {
        if (dependency.featureToggle && dependency.status === 'INACTIVE') {
            dependencyWithFT.push(dependency);
        }
    });
    return dependencyWithFT;
}

function getFeaturesWithFT() {
    let featuresWithFT = [];
    let features = getFeatures();
    features.forEach((feature) => {
        if (feature.featureToggle && feature.status === 'INACTIVE') {
            featuresWithFT.push(feature);
        }
    });
    return featuresWithFT;
}

function getPrivilegesWithFT() {
    let privilegesWithFT = new Map();
    let privileges = getPrivileges();
    privileges.forEach((privilege) => {
        if (privilege.actions) {
            privilege.actions.forEach((action) => {
                if (action.featureToggle && action.status === 'INACTIVE') {
                    privilegesWithFT.set(privilege.id, privilege);
                }
            });
        }

        if (privilege.featureToggle && privilege.status === 'INACTIVE') {
            privilegesWithFT.set(privilege.id, privilege);
        }
    });
    let privilegesArr = [];
    if (privilegesWithFT.size > 0) {
        privilegesWithFT.forEach((value, key, map) => {
            privilegesArr.push(value);
        });
    }
    return privilegesArr;
}

function getAllEntities() {
    let response = {
        'application': getApplications(),
        'categories': getCategories(),
        'dependencies': getDependencies(),
        'features': getFeatures(),
        'privilege': getPrivileges(),
    };
    return response;
}

////////////////////// Public /////////////////////

function getInactiveEntityWithFT() {
    let application = getApplicationWithFT();
    let dependencies = getDependencyWithFT();
    let features = getFeaturesWithFT();
    let privilege = getPrivilegesWithFT();
    let response = {
        'application': application,
        'dependencies': dependencies,
        'features': features,
        'privilege': privilege
    };

    console.log('-----Final Result-------');
    let responseJsonString = JSON.stringify(response, null, 2);
    fileUtil.writeData(CONSTANTS.targetFile, responseJsonString);
}

function getAllFeatureToggles() {
    let featureTogglesSet = new Set();

    let response = getAllEntities();
    for (const [key, value] of Object.entries(response)) {
        console.log(key);
        if (value != null && value.length > 0) {
            if (key === 'privilege') {
                value.forEach((privilege) => {
                    if (privilege.actions && privilege.actions.length > 0) {
                        privilege.actions.forEach((action) => {
                            if (action.featureToggle) {
                                featureTogglesSet.add(action.featureToggle);
                            }
                        })
                    }
                });
            }

            value.forEach((entity) => {
                if (entity.featureToggle) {
                    featureTogglesSet.add(entity.featureToggle);
                }
            });
        }
    }

    console.log('----');
    console.log(featureTogglesSet);
}

async function getAllFeatureTogglesFromFiles() {
    let allFeatureToggles = await xmlUtil.readAllEnvsFeatureToggles();
    let fileOutput = fileUtil.readFile(CONSTANTS.inputFilePath, CONSTANTS.inputFileName);
    let ftArray = fileOutput.split('\r\n');
    //console.log(ftArray);

    let map = new Map();
    ftArray.forEach((ft) => {
        let blankArr = [];
        map.set(ft, blankArr);
    });

    for (const [key, value] of Object.entries(allFeatureToggles)) {
        //console.log(key);
        ftArray.forEach((ft) => {
            let res = isFeatureToggleContain(value, ft);
            //console.log(res);
            if (res.found === true) {
                let val = map.get(ft);
                val.push(key);
                map.set(ft, val);
            } else {
                let val = map.get(ft);
                val.push(' ');
                map.set(ft, val);
            }
        });

    }
    console.log('----------------Results--------------------');
    map.forEach((value, key, m) => {
        let res = key + ',' + value.toString();
        console.log(res);
    });

}

function isFeatureToggleContain(value, ft) {
    for (f of value) {
        let featureId = f['$'].uid;
        if (ft === featureId) {
            return {found: true, Id: featureId};
        }
    }
    return {found: false, Id: null};
}

module.exports = {
    getInactiveEntityWithFT,
    //getAllFeatureToggles,
    getAllFeatureTogglesFromFiles
}
