var _ = require("underscore");

var Model = function (device) {
    this.attributes = this.parse(device);
};

_.extend(Model.prototype, {
    set: function (data, options) {
        var changed = {};
        if(data && !_.isEmpty(data)) {
            _.each(data, function(value, index) {
                this.attributes[index] = changed[index] = value;
                this.trigger("change:"+index);
            }, this);

            this.trigger("change");
        }

        return changed;

    },

    trigger: function(event) {
        if(this.events[event]) {
            var func = this.events[event]
            this[func](event);
        }
    }
});

Model.extend = function(newMethods) {
    _.extend(Model.prototype, newMethods);
    return Model;
};


exports.Model = Model;