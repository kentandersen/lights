requirejs(["jquery", "backbone", "modules/app/app"],
  function(jquery,   Backbone,   App) {

    var app = new App({ el: $("#application") });

    app.addSections({
        "nav": "#nav",
        "main": "#main"
    });

    app.run(function() {
        Backbone.history.start();
    });

});

