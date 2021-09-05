const basePath = "C:/repos/WFO/product-catalog/saas-product-catalog-content";
const CONSTANTS = {
    appPath: basePath + "/applications",
    categoryPath: basePath + "/categories",
    dependencyPath: basePath + "/dependencies",
    featurePath: basePath + "/features",
    privilegePath: basePath + "/privileges",
    targetFile: './src/target/output.json',

    folderSuffix: 'feature-toggles/',
    fileName: 'toggles.xml',
    featureToggleBaseRepo: 'C:/repos/WFO/FeatureToggles/',
    featuretoggleRepo: {
        dev: 'dev-',
        test: 'test-',
        icpuneperf: 'icpune-perf-',
        perf: 'perf-',
        prodAu: 'production-au-',
        prodDe: 'production-de-',
        prodUk: 'production-uk-',
        prodNa1: 'production-',
        prodNa2: 'production-fedramp-',
        prodNaCa: 'production-ca-',
        prodJp: 'production-jp-',
        staging: 'staging-',
        testNvir: 'test-nvir-',
    },

    inputFilePath: 'C:/Pritam/nodeJs/TMUtil/JSutil/src/resources/',
    inputFileName: 'inputFTs.txt'
}

module.exports = {
    CONSTANTS
}

