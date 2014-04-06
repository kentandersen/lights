define(function(require) {

    var _ = require("underscore");
    var $ = require("jquery");
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
            this.dim = _.throttle(this.dim, 500, {leading: false});
        },

        dim: function(event) {
            var value = event.currentTarget.value;
            this.model.save("dimLevel", value, {patch: true});
        },

    });

    return DimmableLightsView;

});