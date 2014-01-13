#!/usr/bin/env node
var fs = require("fs");
var express = require("express");
var cons = require("consolidate");
var path = require("path");
var api = require("./api.js");

// var privateKey = fs.readFileSync("./security/privatekey.pem").toString();
// var certificate = fs.readFileSync("./security/certificate.pem").toString();

// var serverOptions = {
//     key: privateKey,
//     cert: certificate

//     // ,ca: fs.readFileSync('ssl/ca/ca.crt'),
//     // requestCert: true,
//     // rejectUnauthorized: true
// };

var app = express();

app.use(express.bodyParser());
api(app);

// assign the mustache engine to .html files
app.engine('html', cons.handlebars);

// set .html as the default extension
app.set('view engine', 'html');
app.set('views', path.join(__dirname, "views"));


var renderData;

// development only
app.configure('development', function() {
    app.use(express.static(path.join(__dirname, "..", "webapp")));
    renderData = {
        cssFile: "css/lights.less",
        jsFiles: [
            "js/vendor/require.js",
            "js/require.conf.js",
            "js/main.js"
        ]
    }
});

// production only
// tips: export NODE_ENV=production && node app.js
app.configure('production', function() {
    app.use(express.static(path.join(__dirname, "..", "..", "build", "webapp")));
    renderData = {
        cssFile: "css/style.css",
        jsFiles: ["js/app.js"]
    }
});


// static file setup
app.get('/', function(req, res) {
    res.render('index', renderData);
});


// if on port is set, use port.
var port = process.env.PORT || 1339;
app.listen(port);

console.log("app started of port " +  port);