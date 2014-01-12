var telldusRepository = require("./telldusRepository.js");

exports.getDevices = function() {
    return telldusRepository.getDevices();
};

exports.getDevice = function(id) {
    return telldusRepository.getDevice(id);
};