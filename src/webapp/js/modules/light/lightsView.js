define(function(require) {

    var View = require("base/view");
    var LightItemView = require("./lightItemView");

    var LightsView = View.extend({

        className: "lights",

        tagName: "ul",

        initialize: function(options) {
            this.lights = options.lights;
            this.listenTo(this.lights, "sync", this.updateList);
            this.listenTo(this.lights, "add", this.addToList);
        },

        render: function() {

        },

        addToList: function(light, collection) {

            var item = new LightItemView({
                model: light
            });
            item.render();

            this.$el.append(item.el);

        }
    });

    return LightsView;

});