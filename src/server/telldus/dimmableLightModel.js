var _ = require("underscore");
var telldusRepository = require("./telldusRepository.js");
var LightModel = require("./lightModel.js");


var DimmableLightModel = function(attributes) {
    LightModel.apply(this, arguments);
};

_.extend(DimmableLightModel.prototype, {

    dim: function(dimLevel) {
        this.attributes.dimLevel = dimLevel;
        return telldusRepository.dim(this.id, this.attributes.dimLevel);
    }

}, LightModel.prototype);

module.exports = DimmableLightModel;