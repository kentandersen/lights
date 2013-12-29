var tests = Object.keys(window.__karma__.files).filter(function (file) {
      return /Spec\.js$/.test(file);
});

var preIncluded = ['sinon', 'jasmine-sinon'];

var deps = preIncluded.concat(tests);

requirejs.config({
    baseUrl: '/base/src/public/js',

    paths: {
        'sinon': '/base/test/vendor/sinon',
        'jasmine-sinon': '/base/test/vendor/jasmine-sinon'
    },

    shim: {
        'sinon': {
            exports: 'sinon'
        },
        'jasmine-sinon': ['sinon']
    },

    deps: deps,
    callback: window.__karma__.start
});


