#!/usr/bin/env node

var path = require('path');
var glob = require('glob');
var make = require("make");

var build = process.env.OUTPUT_DIR || path.join('build', 'webapp');
var webapp = path.join('src', 'webapp');
var config = path.join('config');


make.addGroup('build')

    .addJob('cleandir', 'cleandir', {
        dir: build
    })

    .addJob('css', 'less', {
        inputFile:  path.join(webapp, 'css', 'lights.less'),
        outputFile: path.join(build, 'css', 'style.css'),
        rootImagePath: "src/webapp"
    })

    .addJob('js', 'require', {
        config:     path.join(config, 'buildconfig.js'),
        outputFile: path.join(build, 'js', 'app.js')
    })

    .addJob('images', 'images', {
        inputDir:   path.join(webapp, 'images'),
        outputDir:  path.join(build, 'images')
    });

make.addGroup('test')

    .addJob('jshint', 'jshint', {
        files:      glob.sync(path.join(webapp, 'js', '**', '*.js')),
        exclude:    path.join(webapp,'js', 'vendor/')
    })

    .addJob('js', 'karma', {
        config:     path.join(config, 'karma.conf.js')
    });

make.addGroup('util', { skip: true })

    .addJob('testcont', 'karma', {
        config:     path.join(config, 'karma.conf.js'),
        singleRun:  false,
        description: "Running js unit tests continuously on save"
    })

make.done();
