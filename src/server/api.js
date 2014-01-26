var express = require("express");
var telldusService = require("./telldus/telldusService.js");

var setupApi = function(app) {

    app.use(express.bodyParser());

    app.get('/lights', function (req, res) {
        var devices = telldusService.getDevices();
        var deviceAttri = devices.map(function(device){
            return device.attributes
        });

        res.json(deviceAttri);
    });

    app.get('/lights/:id', function (req, res) {
        var id = parseInt(req.params.id, 10);
        var device = telldusService.getDevice(id);

        if(device) {
            res.json(device.attributes);
        } else {
            res.json({error:"no such device"}, 404);
        }
    });

    app.patch('/lights/:id', function (req, res) {
        var id = parseInt(req.params.id, 10);
        var device = telldusService.getDevice(id);

        if(device) {
            res.json(device.set(req.body));
        } else {
            res.json({error:"no such device"}, 404);
        }
    });

};


module.exports = setupApi;