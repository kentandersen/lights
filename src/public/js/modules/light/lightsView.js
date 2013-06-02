define(function(require) {

    var _ = require("underscore");
    var View = require('base/view');
    var events = require('component/eventBus');

    // var UserDetailView = require('./userDetailView');
    var template = require('hgn!./lights');

    var LightsView = View.extend({

        events: {
            "click .on": "turnOn",
            "click .off": "turnOff",
            "change .dimLevel": "dimLevelChangeHandler",
            "mousedown .dimLevel": "_markAsDirty",
            "mouseup .dimLevel": "_removeMarkedAsDirty"
        },

        template: template,

        tagName: "ul",

        initialize: function(options) {
            this.lights = options.lights;

            this.listenTo(this.lights, "sync", this.render, this);

            this.debounceDim = _.debounce(this.dim, 200);
        },

        render: function(event) {
            if(this.isDirty) {return;}

            this.renderTemplate({
                lights: this.lights.toJSON()
            });
            return this;
        },

        turnOn: function(event) {
            var lightModel = this._getLightModel(event.currentTarget)
            if(lightModel) {
                lightModel.save("status", "ON", {patch: true});
            }
        },
        
        turnOff: function(event) {
            var lightModel = this._getLightModel(event.currentTarget)
            if(lightModel) {
                lightModel.save("status", "OFF", {patch: true});
            }
        },

        dim: function(level, lightModel) {
            level = parseInt(level, 10);
            if(lightModel) {
                lightModel.save("dimLevel", level, {patch: true});
            }
        },

        dimLevelChangeHandler: function(event) {
            var $element = $(event.currentTarget);
            var lightModel = this._getLightModel($element);
            this.debounceDim($element.val(), lightModel)
        },

        _getLightModel: function(element) {
            var $element = $(element);
            var id = $element.closest("li").data("light-id");
            return this.lights.get(id);
        },

        _markAsDirty: function() {
            this.isDirty = true;
        },

        _removeMarkedAsDirty: function() {
            this.isDirty = false;
            this.render();
        }


    });

    return LightsView;

});
