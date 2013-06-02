var _ = require("underscore");
var DeviceModel = require("./deviceModel").DeviceModel;

var Devices = function(devices) {

    this.models = _.map(devices, function(device) {
        return new DeviceModel(device);
    });

};


// public methods
_.extend(Devices.prototype, {
    getDevicesBy: function (name, unit) {
        return _.find(this.models, function (model) {
            return model.attributes[name] === unit;
        });
    },

    map: function(itterator) {
        return _.map(this.models, itterator);
    },

    each: function(itterator) {
       return _.each(this.models, itterator);
    }
});


exports.Devices = Devices