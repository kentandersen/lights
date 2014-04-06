var _ = require("underscore");
var telldusRepository = require("./telldusRepository.js");
var LightModel = require("./lightModel.js");


var DimmableLightModel = LightModel.extend({

    events: _.extend({

        "change:dimLevel": "dimLevelChangeHandler"

    }, LightModel.prototype.events),

    parse: function(attr) {
        var returnObj = LightModel.prototype.parse.apply(this, arguments);
        returnObj.dimLevel = attr.status.level;
        returnObj.isDimmable = true;

        return returnObj;
    },

    dim: function(dimLevel) {
        return telldusRepository.dimDevice(this.id, dimLevel);
    },

    dimLevelChangeHandler: function() {
        this.dim(this.attributes.dimLevel);
    }

});

module.exports = DimmableLightModel;