// var tellduscore = require('./build/Release/telldus-core-js');
var fixtures = require("./fixtures.js");

var runCallback = function(callback, returnObj) {
    callback = callback || function() {};

    setTimeout(function(){
        callback(null, returnObj);
    }, 500);
};

(function (exports, global) {

    exports.getDevices = function(callback) {
        runCallback(callback, fixtures);
    };
    exports.getDevicesSync = function() {
        return fixtures;
    };

    exports.turnOn = function(id, callback) {
        runCallback(callback);
    };

    exports.turnOnSync = function(id) {
        return 0;
    };

    exports.turnOff = function(id, callback) {
        runCallback(callback);
    };

    exports.turnOffSync = function(id) {
        return 0;
    };

    exports.dim = function(id, level, callback) {
        runCallback(callback);
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