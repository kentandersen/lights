var _ = require("underscore");
var settings = require("../../config/appsettings.js");
var Model = require("./mvc/model.js").Model;

if(!settings.useMock) {
    var telldus = require("telldus-core-js");
} else {
    var telldus = require("./telldus-core-js-mock/telldus-mock.js");
}

var DeviceModel = Model.extend({

    events: {
        "change:status": "statusChangeHandler",
        "change:dimLevel": "dim"
    },

    parse: function(data) {
        data.isDimmable = _.contains(data.methods, "DIM");
        if(data.isDimmable) {
            data.dimLevel = data.status.level
        }
        data.status = data.status.status;

        return data;
    },

    turnOn: function () {
        return telldus.turnOn(this.attributes.id);
    },

    turnOff: function () {
        return telldus.turnOff(this.attributes.id);
    },

    dim: function () {
        if(this.isDimmable()) {
            return telldus.dim(this.attributes.id, this.attributes.dimLevel);
        } else {
            return {
                status: "error",
                error: "not a dimmable device"
            };
        }
    },

    isDimmable: function() {
        return this.attributes.isDimmable;
    },

    statusChangeHandler: function () {

        var status = this.attributes.status;
        if(status === "ON") {
            return this.turnOn();
        } else {
            return this.turnOff();
        }
    }

});

exports.DeviceModel = DeviceModel;