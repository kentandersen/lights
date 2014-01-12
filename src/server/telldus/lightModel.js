var _ = require("underscore");
var Model = require("../base/model.js");
var telldusRepository = require("./telldusRepository.js");

var DeviceModel = Model.extend({

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