const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();

const entityHandler = require('./src/util/entityHandler');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers","*");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use("/", router);

app.listen(4242, async () => {
    console.log("Started on PORT 4242");
});

router.get('/', function (req, res) {
    res.send("index.html");
});

router.get('/product-catalog', async function (req, res, next) {
    console.log('HHTP call received');
    const response = entityHandler.getAllProductCatalogData();
    res.send(response);

});

/*router.post('/item', async function (req, res, next) {
    var isAuthorised = await tokenService.authorizeUser(req, res, next);
    if (isAuthorised.success === true) {
        let item = requestService.convertToItem(req.body);
        let result = await ddbService.createItem(item);
        requestService.createSuccessResponse(res, result);
    } else {
        requestService.createFailedResponse(res, 401, isAuthorised);
    }
});*/
