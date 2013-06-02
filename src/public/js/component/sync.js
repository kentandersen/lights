define(function(require) {

    var _ = require('underscore');
    var Backbone = require('backbone');

    var baseUrl = '/';

    var urlError = function() {
        throw new Error('A "url" property or function must be specified');
    };

    return function(method, model, options) {
        options = options || {};

        var url = options.url || _.result(model, 'url') || urlError();
        // options.url = baseUrl + url;

        Backbone.sync.apply(this, arguments);
    };

});
