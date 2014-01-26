var Q = require("q");
var _ = require("underscore");

var useMock = process.env.NODE_ENV === "production";
var telldus = require(!useMock ? "telldus" : "./mock/telldus.js");

// populate all devices
var devices = telldus.getDevicesSync();



exports.getDevices = function() {
    return devices;
};

exports.getDevice = function(id) {
    return _.findWhere(devices, {id: id});
};

exports.turnOnDevice = function(id) {
    var deferred = Q.defer();

    return telldus.turnOn(id, function(error) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            deferred.resolve();
        }
    });

    return deferred.promise;
};

exports.turnOffDevice = function(id) {
    var deferred = Q.defer();

    return telldus.turnOff(id, function(error) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            deferred.resolve();
        }
    });

    return deferred.promise;
};

exports.dimDevice = function(id, dimLevel) {
    var deferred = Q.defer();

    return telldus.dim(id, dimLevel, function(error) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            deferred.resolve();
        }
    });

    return deferred.promise;
};


