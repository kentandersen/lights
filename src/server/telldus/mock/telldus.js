// var tellduscore = require('./build/Release/telldus-core-js');
var fixtures = require("./fixtures.js");

(function (exports, global) {

    exports.getDevices = function(callback) {
        setTimeout(function(){
            callback(null,fixtures);
        }, 500);
    };
    exports.getDevicesSync = function() {
        return fixtures;
    };

    exports.turnOn = function(id, callback) {
        setTimeout(function(){
            callback(null);
        }, 500);
    };

    exports.turnOnSync = function(id) {
        return 0;
    };

    exports.turnOff = function(id, callback) {
        setTimeout(function(){
            callback(null);
        }, 500);
    };

    exports.turnOffSync = function(id) {
        return 0;
    };

    exports.dim = function(id, level, callback) {
        setTimeout(function(){
            callback(null);
        }, 500);
    };

    exports.dimSync = function(id, level) {
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