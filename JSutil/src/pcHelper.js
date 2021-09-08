const entityHandler = require('./util/entityHandler');
const CONSTANTS = require('./util/constants').CONSTANTS;
let xmlUtil = require('./util/xmlUtil');

console.log('-------Program starts------');
main().then(()=>{
    console.log('-------Program finshes------')
});

async function main() {
    //await entityHandler.getInactiveEntityWithFT();
    await entityHandler.getAllFeatureTogglesFromFiles();
}
