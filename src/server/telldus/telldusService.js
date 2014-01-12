var telldusRepository = require("./telldusRepository.js");

// models
var LightModel = require("./lightModel.js");
var DimmableLightModel = require("./dimmableLightModel.js");


var createDeviceModel = function(attributes) {
    if(attributes.model === "selflearning-dimmer") {
        return new DimmableLightModel(attributes);
    } else {
        return new LightModel(attributes);
    }
};

exports.getDevices = function() {
    var devices = telldusRepository.getDevices();

    return devices.map(function(device) {
        return createDeviceModel(device);
    });
};

exports.getDevice = function(id) {
    var device = telldusRepository.getDevice(id);
    if(device) {
        return createDeviceModel(device);
    }
};