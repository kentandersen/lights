var telldusService = require("./telldus/tellduSService.js");

var setupApi = function(app) {

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


module.exports = setupApi;