define(function(require) {

    var Model = require('base/model');

    var Light = Model.extend({

        defaults: {
            id:     null,
            name:   "",
            status: "DIM",
            model:  "",
            type:   "",
            isDimmable: false,
            dimLevel: null
            // "element": null
        },

        initialize: function(){
            this.on("change:status", this.statusChangeHandler);
        },

        statusChangeHandler: function(model, value) {
            this.save({
                status: value
            }, {patch: true});
        }

    });

    return Light;

});