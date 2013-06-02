define(function(require) {

    var Model = require('base/model');

    var Light = Model.extend({
        
        defaults: {
            "name": "",
            "id":   null,
            "model": "",
            "type": "",
            "element": null
        },

        initialize: function(){
        },

    });

    return Light;

});
