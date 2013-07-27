var Devices = require("./devices.js").Devices;
var settings = require("../../config/appsettings.js");
var express = require("express");

if(!settings.useMock) {
    var telldus = require("telldus-core-js");
} else {
    var telldus = require("./telldus-core-js-mock/telldus-mock.js");
}


var setupApi = function(app) {

    var devices = new Devices(telldus.getDevices());

    app.get('/lights', function (req, res) {
        var deviceAttr = devices.map(function(device){
            return device.attributes;
        });

        res.send(deviceAttr);
    });

    app.get('/lights/:id', function (req, res) {
        var id = parseInt(req.params.id, 10);    
        var device = devices.getDevicesBy("id", id);

        if(device) {
            res.send(device.attributes);
        } else {
            res.send("no such device", 404);
        }
    });

    app.patch('/lights/:id', function (req, res) {
        var id = parseInt(req.params.id, 10);    
        var device = devices.getDevicesBy("id", id);

        if(device) {
            res.send(device.set(req.body), 200);
        } else {
            res.send("no such device", 404);
        }
    });


    app.put('/lights/:id/dim=:level', function (req, res) {
        var id = parseInt(req.params.id, 10);
        var level = parseInt(req.params.level, 10);
        var device = devices.getDevicesBy("id", id);

        if(device) {
            var dim = device.dim(level);
            res.send(dim, dim.status === "ok" ? 200 : 500);
        } else {
            res.send("no such device", 404);
        }
    });

};


exports.initialize = setupApi;