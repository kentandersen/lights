module.exports = function(config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '',

        // list of files / patterns to load in the browser
        files: [
            'src/public/js/require.conf.js',
            'test/test-main.js',
            { pattern: 'test/**/*.js', included: false },
            { pattern: 'test/*.js', included: false },
            { pattern: 'src/public/**/*.js', included: false },
            { pattern: 'src/public/**/*.mustache', included: false }
        ],

        frameworks: ["jasmine", "requirejs"],

        // list of files to exclude
        exclude: [],

        // preprocessors: {
        //     'src/public/js/**/*.js': 'coverage'
        // },

        // coverageReporter: {
        //   type : 'html',
        //   dir : 'target/coverage/'
        // },

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit'
        // reporters: ['progress', 'coverage'],

        // web server port
        port: 9880,

        // cli runner port
        runnerPort: 9105,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Chrome']
    });
};
