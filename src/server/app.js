var fs = require("fs");
var https = require('https');
var express = require("express");
var settings = require("../../config/appsettings.js");
var path = require('path');
var restfullApi = require("./api.js");
var hogan = require('hogan.js');

var indexHtmlMustache = fs.readFileSync("./src/public/index.mustache").toString();
var indexHtmlTemplate = hogan.compile(indexHtmlMustache);

var privateKey = fs.readFileSync("./security/privatekey.pem").toString();
var certificate = fs.readFileSync("./security/certificate.pem").toString();  

var serverOptions = {
    key: privateKey,
    cert: certificate

    // ,ca: fs.readFileSync('ssl/ca/ca.crt'),
    // requestCert: true,
    // rejectUnauthorized: true
};

var app = express();

app.use(express.bodyParser());

// development only
app.configure('development', function() {
    app.get('/', function (req, res) {
        var indexHtml = indexHtmlTemplate.render({
            cssFile: "css/app.less",
            jsFile: "vendor/require.js",
            includeLessCompiler: true
        });

        res.send(indexHtml);
    });

    app.use(express.static("./src/public"));
});

// production only
// tips: export NODE_ENV=production && node app.js
app.configure('production', function() {
    app.use(express.static("./build/public"));
});

restfullApi.initialize(app);

console.log("Web server started in " + app.get("env") + (settings.useMock ? " with mock" : ""));
https.createServer(serverOptions, app).listen(8443);

exports.app = app;