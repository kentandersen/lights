// var tellduscore = require('./build/Release/telldus-core-js');
var fixtures = require("./fixtures.js");

(function (exports, global) {

    exports.getDevices = function() {
        return fixtures;
    };

    exports.turnOn = function(id) {
        return 0;
    };

    exports.turnOff = function(id) {
        return 0;
    };

    exports.dim = function(id, levl) {
        return 0;
    };

    exports.addDeviceEventListener = function(callback) {
        // return tellduscore.addDeviceEventListener(callback);
    };

    exports.addSensorEventListener = function(callback) {
        // return tellduscore.addSensorEventListener(callback);
    };

    exports.addRawDeviceEventListener = function(callback) {
        // return tellduscore.addRawDeviceEventListener(callback);
    };

    exports.removeEventListener = function(id) {
        // return tellduscore.removeEventListener(id);
    };

})('object' === typeof module ? module.exports : (this.telldus = {}), this);