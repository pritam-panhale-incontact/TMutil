var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();


var tables = [
    {
        tableName: 'dev-product-catalog-products',
        pk: 'productId'
    },
    {
        tableName: 'dev-product-catalog-applications',
        pk: 'productId',
        sk: 'applicationId'
    },
    {
        tableName: 'dev-product-catalog-categories',
        pk: 'categoryId'
    },
    {
        tableName: 'dev-product-catalog-dependencies',
        pk: 'dependencyId'
    },
    {
        tableName: 'dev-product-catalog-features',
        pk: 'featureId'
    },
    {
        tableName: 'dev-product-catalog-privileges',
        pk: 'privilegeId'
    },
];

tables.forEach((table) => {
    scanTable(table);
});

function scanTable(table) {
    var tableName = table.tableName;
    var params = {
        TableName: tableName
    };

    docClient.scan(params, onScan);

    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            // print all the movies
            console.log("Scan succeeded for table ", tableName);
            console.log(data.Items.length);

            data.Items.forEach(function (item) {
                deleteData(table, item);
                //console.log(item[table.pk]);
                //console.log(item);
            });

            // continue scanning if we have more movies, because
            // scan can retrieve a maximum of 1MB of data
            if (typeof data.LastEvaluatedKey != "undefined") {
                console.log("Scanning for more...");
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                docClient.scan(params, onScan);
            }
        }
    }
}


function deleteData(table, item) { 

    var key = {};
    key[table.pk] = item[table.pk];

    if (table.sk && table.sk !== '') {
        key[table.sk] = item[table.sk];
    }

    var params = {
        TableName: table.tableName,
        Key: key
    };

    console.log("Attempting delete...");
    docClient.delete(params, function (err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
        }
    });
}
