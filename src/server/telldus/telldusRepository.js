var _ = require("underscore");
var LightModel = require("./lightModel.js");
var DimmableLightModel = require("./dimmableLightModel.js");


var useMock = true;
var telldus = require(!useMock ? "telldus-core-js" : "./mock/telldus-core-js.js");

// populate all devices
var devices = telldus.getDevices();



exports.getDevices = function() {
    return _.map(devices, function(device) {
        return createDeviceModel(device);
    });
};

exports.getDevice = function(id) {
    var device = _.findWhere(devices, {id: id});
    if(device) {
        return createDeviceModel(device);
    }
};