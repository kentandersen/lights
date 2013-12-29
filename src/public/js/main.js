define(function(require) {

    var $ = require('jquery');
    var Backbone = require('backbone');

    var App = require('modules/app/app');

    var app = new App({ el: $("#application") });

    app.addSections({
        "nav": "#nav",
        "main": "#main"
    });

    app.run(function() {
        Backbone.history.start();
    });

});

