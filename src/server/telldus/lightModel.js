var _ = require("underscore");
var Model = require("../base/model.js");
var telldusRepository = require("./telldusRepository.js");

var DeviceModel = Model.extend({

    events: {
        "change:status": "statusChangeHandler"
    },

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
    },

    statusChangeHandler: function() {
        if(this.attributes.status === "ON") {
            return this.turnOn();
        } else {
            return this.turnOff();
        }
    }

});

module.exports = DeviceModel;