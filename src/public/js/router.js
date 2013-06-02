define(function(require) {

    var Backbone = require('backbone');

    var LightCollection = require('modules/light/lightCollection');
    var LightView = require("modules/light/lightsView");
    var Router = Backbone.Router.extend({

        initialize: function(sections) {
            this.sections = sections;
        },

        routes: {
            '': 'light'
        },

        light: function() {
            var lightCollection = new LightCollection();
            lightCollection.fetch();

            var lightsView = new LightView({ lights: lightCollection });

            this.sections.main.show(lightsView);
            lightsView.render();
        }
    });

    return Router;

});
