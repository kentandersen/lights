var _ = require("underscore");
var telldusRepository = require("./telldusRepository.js");

var DeviceModel = function(attributes) {
    this.id = attributes.id;
    this.attributes = attributes;
};

_.extend(DeviceModel.prototype, {

    turnOn: function () {
        return telldusRepository.turnOnDevice(this.id);
    },

    turnOff: function () {
        return telldusRepository.turnOffDevice(this.id);
    }

});

module.exports = DeviceModel;