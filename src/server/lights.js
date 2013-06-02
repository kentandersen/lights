var fs = require("fs");
var https = require('https');
var express = require("express");
var settings = require("../../config/appsettings.js");
var path = require('path');
var restfullApi = require("./api.js");


var privateKey = fs.readFileSync("../../security/privatekey.pem").toString();
var certificate = fs.readFileSync("../../security/certificate.pem").toString();  

var serverOptions = {
    key: privateKey,
    cert: certificate

    // ,ca: fs.readFileSync('ssl/ca/ca.crt'),
    // requestCert: true,
    // rejectUnauthorized: true
};

var app = express();

// development only
app.configure('development', function() {
    app.use(express.static("../public"));
});

// production only
app.configure('production', function() {
    app.use(express.static("../../build/public"));
});

restfullApi.initialize(app);

console.log("Web server started" + (settings.useMock ? " with mock" : ""));
https.createServer(serverOptions, app).listen(8443);
