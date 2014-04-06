define(function(require) {

    var _ = require("underscore");
    var LightItemView = require('./lightItemView');

    // var UserDetailView = require('./userDetailView');
    var template = require('hgn!./dimmableLights');

    var DimmableLightsView = LightItemView.extend({

        template: template,

        events: _.extend({
            "change input":    "dim"
        }, LightItemView.prototype.events),

        initialize: function(){
            LightItemView.prototype.initialize.apply(this, arguments);
            this.dim = _.debounce(this.dim, 500);
        },

        dim: function(event) {
            var value = parseInt(event.currentTarget.value, 10);
            this.model.save("dimLevel", value, {patch: true});
        },

    });

    return DimmableLightsView;

});