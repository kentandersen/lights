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
        "change:status": "statusChangeHandler"
    },

    parse: function(data) {
        data.status = data.status.status;
        return data;
    },

    turnOn: function () {
        telldus.turnOn(this.attributes.id);
        return {
            status: "ok"
        };
    },

    turnOff: function () {
        telldus.turnOff(this.attributes.id);
        return {
            status: "ok"
        };
    },

    dim: function (level) {
        if(_.contains(this.attributes.methods, "DIM")) {
            telldus.dim(this.attributes.id, level);
            return {
                status: "ok"
            };
        } else {
            return {
                status: "error",
                error: "not a dimmable device"
            };
        }
    },

    statusChangeHandler: function () {

        var status = this.attributes.status;
        if(status === "ON") {
            return this.turnOff();
        } else {
            return this.turnOn();
        }
    },

});

exports.DeviceModel = DeviceModel;