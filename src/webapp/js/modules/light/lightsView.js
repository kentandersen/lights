define(function(require) {

    var _ = require("underscore");
    var $ = require("jquery");
    var View = require('base/view');

    // var UserDetailView = require('./userDetailView');
    var template = require('hgn!./lights');

    var LightsView = View.extend({

        options: {
            dragThreshold: 40
        },

        events: {
            "mousedown a":      "mouseDownHandler",
            "touchstart a":     "mouseDownHandler",
            "webkitTransitionEnd li.animate": "animateEndHandler"

            // "change .dimLevel": "dimLevelChangeHandler",
        },

        template: template,

        className: "lights",

        tagName: "ul",

        initialize: function(options) {
            _.bindAll(this, "mouseMoveHandler", "mouseUpHandler");
            this.lights = options.lights;

            this.listenToOnce(this.lights, "sync", this.render, this);
            this.listenTo(this.lights, "change:status", this.statusChangeHandler, this);

            this.debounceDim = _.debounce(this.dim, 200);
        },

        render: function() {

            this.renderTemplate({
                lights: this.lights.map(function(lightModel) {
                    var data = lightModel.toJSON();
                    data.isOn = lightModel.get("status") === "ON";
                    return data;
                })
            });
            return this;
        },

        toggle: function($light, toggle) {
            var lightModel = this._getLightModel($light);
            var status = toggle ? "ON" : "OFF";


            if(lightModel && lightModel.get("status") !== status) {
                lightModel.save("status", status, {patch: true});
            }
        },

        dim: function(level, lightModel) {
            level = parseInt(level, 10);
            if(lightModel) {
                lightModel.save("dimLevel", level, {patch: true});
            }
        },

        mouseDownHandler: function(event) {
            event.preventDefault();
            var $element = $(event.currentTarget);

            $("body").on("mousemove touchmove", {
                dragStartX: event.originalEvent.targetTouches ? event.originalEvent.touches[0].pageX : event.clientX,
                element: $element
            }, this.mouseMoveHandler);

            $("body").on("mouseup touchend", {
                element: $element
            }, this.mouseUpHandler);

        },

        mouseUpHandler: function(event) {
            var $element = event.data.element;

            $element.closest("li").addClass("animate");

            $("body").off("mousemove touchmove", this.mouseMoveHandler);
            $("body").off("mouseup touchend", this.mouseUpHandler);
            $element.css("transform", "");
        },

        mouseMoveHandler: function(event) {
            event.preventDefault();
            var $element = event.data.element;
            var dragDiff;

            if(event.originalEvent && event.originalEvent.touches) {
                dragDiff = event.originalEvent.touches[0].pageX - event.data.dragStartX;
            } else {
                dragDiff = event.clientX - event.data.dragStartX;
            }

            $element.css("transform", "translate(" + dragDiff + "px,0px)");

            if(dragDiff > this.options.dragThreshold ) {
                this.toggle($element, false);
            } else if(dragDiff < -this.options.dragThreshold) {
                this.toggle($element, true);
            }
        },

        animateEndHandler: function(event) {
            $(event.currentTarget).removeClass("animate");
        },

        statusChangeHandler: function(model) {
            var isStatusON = model.get("status") === "ON";
            var $lightElement = this.$("li[data-light-id='" + model.id + "']");

            $lightElement.toggleClass("lightOn", isStatusON);
            $lightElement.toggleClass("lightOff", !isStatusON);
        },

        dimLevelChangeHandler: function(event) {
            var $element = $(event.currentTarget);
            var lightModel = this._getLightModel($element);
            this.debounceDim($element.val(), lightModel);
        },

        _getLightModel: function(element) {
            var $element = $(element);
            var id = $element.closest("li").data("light-id");
            return this.lights.get(id);
        }
    });

    return LightsView;

});