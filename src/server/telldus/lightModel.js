var _ = require("underscore");
var telldusRepository = require("./telldusRepository.js");

var DeviceModel = function(attributes) {
    this.id = attributes.id;
    this.attributes = this.parse(attributes);
};

_.extend(DeviceModel.prototype, {

    parse: function(attr) {
        return {
            name: attr.name,
            id: attr.id,
            status: attr.status.status
        };
    },

    turnOn: function () {
        return telldusRepository.turnOnDevice(this.id);
    },

    turnOff: function () {
        return telldusRepository.turnOffDevice(this.id);
    }

});

module.exports = DeviceModel;