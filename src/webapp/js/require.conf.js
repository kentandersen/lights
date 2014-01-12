requirejs.config({

    baseUrl: '/js',

    paths: {
        'jquery': 'vendor/jquery',
        'underscore': 'vendor/underscore',
        'backbone': 'vendor/backbone',
        'hogan': 'vendor/hogan',
        'hgn': 'vendor/plugin/hgn',
        'text': 'vendor/plugin/text'
    },

    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});