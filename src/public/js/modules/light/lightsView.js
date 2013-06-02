define(function(require) {

    var View = require('base/view');
    var events = require('component/eventBus');

    // var UserDetailView = require('./userDetailView');
    var template = require('hgn!./lights');

    var LightsView = View.extend({

        events: {
            "click .on": "turnOn",
            "click .off": "turnOff"
        },

        template: template,

        tagName: "ul",

        initialize: function(options) {
            this.lights = options.lights;

            // this.userDetailView = new UserDetailView({ user: this.user });
            // this.addSubView(this.userDetailView);

            // or this to bind to global events
            // this.listenTo(events, 'global', this.render, this);

            this.listenTo(this.lights, "sync", this.render, this);
        },

        render: function(event) {
            this.renderTemplate({
                lights: this.lights.toJSON()
            });
            // this.renderUserDetail(this.$('.user-detail'));
            return this;
        },

        turnOn: function(event) {
            var lightModel = this.getLightModel(event.currentTarget)
            if(lightModel) {
                lightModel.save("status", "ON", {patch: true});
            }
        },
        
        turnOff: function(event) {
            var lightModel = this.getLightModel(event.currentTarget)
            if(lightModel) {
                lightModel.save("status", "OFF", {patch: true});
            }
        },

        getLightModel: function(element) {
            var $element = $(element);
            var id = $element.closest("li").data("light-id");
            return this.lights.get(id);
        }

    });

    return LightsView;

});
