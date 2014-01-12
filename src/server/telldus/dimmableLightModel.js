var _ = require("underscore");
var telldusRepository = require("./telldusRepository.js");
var LightModel = require("./lightModel.js");


var DimmableLightModel = function(attributes) {
    LightModel.apply(this, arguments);
};

_.extend(DimmableLightModel.prototype, LightModel.prototype, {

    parse: function(attr) {
        var returnObj = LightModel.prototype.parse.apply(this, arguments);
        returnObj.dimLevel = attr.status.level;

        return returnObj;
    },

    dim: function(dimLevel) {
        this.attributes.dimLevel = dimLevel;
        return telldusRepository.dim(this.id, dimLevel);
    }

});

module.exports = DimmableLightModel;