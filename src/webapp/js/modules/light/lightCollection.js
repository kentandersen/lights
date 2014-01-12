define(function(require) {

    var Collection = require('base/collection');
    var LightModel = require("./light");

    var Lights = Collection.extend({

        url: "lights",

        model: LightModel


    });

    return Lights;

});