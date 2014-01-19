var _ = require("underscore");

var useMock = true;
var telldus = require(!useMock ? "telldus" : "./mock/telldus-core-js.js");

// populate all devices
var devices = telldus.getDevices();



exports.getDevices = function() {
    return devices;
};

exports.getDevice = function(id) {
    return _.findWhere(devices, {id: id});
};

exports.turnOnDevice = function(id) {
    return telldus.turnOn(id);
};

exports.turnOffDevice = function(id) {
    return telldus.turnOff(id);
};

exports.dimDevice = function(id, dimLevel) {
    return telldus.dim(id, dimLevel);
};


