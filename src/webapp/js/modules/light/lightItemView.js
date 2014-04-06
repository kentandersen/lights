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

        tagName: "li",

        initialize: function(options) {
            _.bindAll(this, "mouseMoveHandler", "mouseDownHandler", "mouseUpHandler");
            this.listenTo(this.model, "change:status", this.statusChangeHandler);
            //this.debounceDim = _.debounce(this.dim, 200);
        },

        render: function() {
            this.$el.toggleClass("lightOn", this.model.get("status") === "ON");

            this.renderTemplate(this.model.toJSON());
            return this;
        },

        mouseDownHandler: function(event) {
            event.preventDefault();

            $("body").on("mousemove touchmove", {
                dragStartX: event.originalEvent.targetTouches ? event.originalEvent.touches[0].pageX : event.clientX,
            }, this.mouseMoveHandler);

            $("body").on("mouseup touchend", this.mouseUpHandler);

        },

        mouseUpHandler: function(event) {
            this.$el.addClass("animate");

            $("body").off("mousemove touchmove", this.mouseMoveHandler);
            $("body").off("mouseup touchend", this.mouseUpHandler);
            this.$("a").css("transform", "");
        },

        mouseMoveHandler: function(event) {
            event.preventDefault();
            var dragDiff;
            var $element = this.$("a");
            if(event.originalEvent && event.originalEvent.touches) {
                dragDiff = event.originalEvent.touches[0].pageX - event.data.dragStartX;
            } else {
                dragDiff = event.clientX - event.data.dragStartX;
            }

            $element.css("transform", "translate(" + dragDiff + "px,0px)");

            if(dragDiff > this.options.dragThreshold ) {
                this.model.set("status", "OFF");
            } else if(dragDiff < -this.options.dragThreshold) {
                this.model.set("status", "ON");
            }
        },

        animateEndHandler: function(event) {
            $(event.currentTarget).removeClass("animate");
        },

        statusChangeHandler: function() {
            var isStatusON = this.model.get("status") === "ON";
            this.$el.toggleClass("lightOn", isStatusON);
        }
    });

    return LightsView;

});