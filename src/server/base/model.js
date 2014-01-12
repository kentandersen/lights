var _ = require("underscore");

var Model = function (attributes) {
    this.id = attributes[this.idAttribute] || attributes.id;
    this.attributes = this.parse.call(this, attributes);
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


// From Simple.js

var ctor = function() {};
Model.extend = function(properties) {
    var parent = this;

    var child = function() {

        parent.apply(this, arguments);
    };

    ctor.prototype = parent.prototype;
    child.prototype = new ctor();


    _.extend(child.prototype, properties);

    child.extend = parent.extend;

    return child;
};


module.exports = Model;