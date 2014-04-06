define(function(require) {

    var _ = require("underscore");
    var $ = require("jquery");
    var View = require('base/view');

    // var UserDetailView = require('./userDetailView');
    var template = require('hgn!./lights');

    var LightsView = View.extend({

        events: {
            "click .toggle":    "toggle"
        },

        template: template,

        className: "lights",

        tagName: "li",

        initialize: function(options) {
            this.listenTo(this.model, "change:status", this.statusChangeHandler);
        },

        render: function() {
            this.$el.toggleClass("lightOn", this.model.get("status") === "ON");

            this.renderTemplate(this.model.toJSON());
            return this;
        },

        toggle: function() {
            var status = this.model.get("status") === "ON" ? "OFF" : "ON";
            this.model.save("status", status, {patch: true});
        },


        statusChangeHandler: function() {
            var isStatusON = this.model.get("status") === "ON";
            this.$el.toggleClass("lightOn", isStatusON);
        }
    });

    return LightsView;

});