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

router.post('/check-feature-toggles', async function (req, res, next) {
    console.log("Http called received!!!", req.body.featureToggles);
    let response = await entityHandler.getAllFeatureTogglesFromInput(req.body.featureToggles);
    res.send(response);
});
