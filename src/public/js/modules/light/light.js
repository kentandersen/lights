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
        }

    });

    return Light;

});