({
    // for an explanation of these fields, you should go through
    // https://github.com/jrburke/r.js/blob/master/build/example.build.js

    baseUrl: '../src/public/js',
    inlineText: true,
    useStrict: false,
    name: '../vendor/almond',
    include: ['main'],
    insertRequire: ['main'],
    wrap: false,
    mainConfigFile: '../src/public/js/require.conf.js',
    preserveLicenseComments: true,
    logLevel: 0,
    stubModules: ['text', 'hgn'],
    optimize: 'uglify2',
    pragmasOnSave: {
        // exclude compiler logic from Hogan.js
        excludeHogan: true
    }
})
