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

function getAllProductCatalogData() {
    let application = getApplications();
    let dependencies = getDependencies();
    let features = getFeatures();
    let privilege = getPrivileges();
    let categories = getCategories();

    let response = {
        'application': application,
        'dependencies': dependencies,
        'features': features,
        'privilege': privilege,
        'categories' : categories
    };
    return response;
}

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
    return response;
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

    for (const [key, value] of Object.entries(allFeatureToggles)) {
        //console.log(key);
        value.forEach((f) => {
            let featureId = f['$'].uid;
            if (ftArray.includes(featureId)) {
                if (map.has(featureId)) {
                    let val = map.get(featureId);
                    val.add(key);
                    map.set(featureId, val)
                } else {
                    let blankArr = new Set();
                    blankArr.add(key)
                    map.set(featureId, blankArr)
                }
            }
        });

    }
    //console.log(map);
    map.forEach((value, key, m) => {
        let arr = Array.from(value).sort();
        let res = key + ',';
        arr.forEach((a) => {
            res = res + a + ','
        })
        console.log(res);
    });

}

module.exports = {
    getInactiveEntityWithFT,
    //getAllFeatureToggles,
    getAllFeatureTogglesFromFiles,
    getAllProductCatalogData
};
