#!/usr/bin/env node
require('shelljs/make');
require('colors');

var _ = require('underscore'),
    fs = require('fs'),
    glob = require('glob'),
    path = require('path'),
    zlib = require('zlib'),
    hogan = require('hogan.js'),
    moment = require('moment'),
    npmBin = require('npm-bin');

var isWin = (process.platform === 'win32');

/*** CONFIG ********/

var version = process.env.VERSION || moment().format('YYYYMMDD');
    targetDir = process.env.OUTPUT_DIR || path.join('build', 'webapp');

var webapp = path.join('src', 'public'),
    config = path.join('config'),

    indexFile = path.join(webapp, 'index.mustache'),
    mainLessFile = path.join(webapp, 'css', 'app.less'),

    jsFileName = 'app-' + version + '.js',
    jsFile = path.join(targetDir, 'js', jsFileName),
    cssFileName = 'css/style-' + version + '.css',
    cssFile = path.join(targetDir, cssFileName),

    imageResourceFolder = path.join(webapp, 'images'),

    rjsConfig = path.join(config, 'buildconfig.js'),
    jshintConfig = path.join(config, 'jshint.json');


/*** TARGETS ********/

target.all = function() {
    target.test();
    target.build();
};

target.test = function() {
    target.jshint();
    target.spec();
};

target.jshint = function() {
    var files = glob.sync(path.join(webapp, 'js', '**', '*.js'));
    files = _.filter(files, function(file) {
        return file.indexOf('src/webapp/js/vendor/') === -1;
    });

    section('Running JSHint');
    bin('jshint', ['--config ' + jshintConfig, files.join(' ')]);
};

target.spec = function() {
    section('Running JavaScript tests');
    bin('karma', ['start', 'config/karma.conf.js', '--browsers PhantomJS', '--single-run']);
};

target.speccont = function() {
    section('Running JavaScript tests');
    bin('karma', ['start', 'karma.conf.js', '--browsers PhantomJS']);
};

target.build = function() {
    createCleanDir(targetDir);

    target.buildjs();
    target.buildimages();
    target.buildcss();

    echo();echo();
    success("Build succeeded!");
};

target.buildjs = function() {
    section('Building JavaScript → ' + jsFile);
    bin('r.js', ['-o ' + rjsConfig, 'out=' + jsFile]);
};

target.buildcss = function() {
    section('Building Less → ' + cssFile);
    bin('lessc', ['--relative-urls', '--yui-compress', mainLessFile, cssFile]);
    bin('imageinliner', ['-i ' + cssFile, '--overwrite', '--compress', '--rootPath src/public']);
};

target.buildimages = function() {
    section('Copying resources ' + imageResourceFolder + ' → ' + targetDir);
    cp('-r', imageResourceFolder, targetDir);

    section('optimizing images');

    var pngs = glob.sync(path.join(targetDir, '**', '*.png'), {nocase: true});
    optimizePngImages(pngs);

    var svgs = glob.sync(path.join(targetDir, '**', '*.svg'), {nocase: true});
    optimizeSvgImages(svgs);
};

/*** APP FUNCTIONS ********/

var renderAndWriteMustache = function(from, to, data) {
    var mustache = fs.readFileSync(from).toString();
    var template = hogan.compile(mustache);
    var html = template.render(data);

    fs.writeFileSync(to, html);

    success();
};


/*** HELPER FUNCTIONS ********/

// helper to call an NPM binary, which resides in node_modules/.bin/name
// the rest of the arguments are used as space-separated arguments for the binary
var bin = function(name, args, options) {
    var res = npmBin(name, args, options);
    done(res);
}

var optimizePngImages = function(pngs) {
    if(pngs.length > 0) {
        var res = exec('pngquant --force --speed 1 --ext .png -- ' + pngs.join(' '));
        done(res);
    }
};

var optimizeSvgImages = function(svgs) {
    if(svgs.length > 0) {
        svgs.forEach(function(svg) {
            npmBin('svgo', svg, {silent: true});
        });
    }
};

var createCleanDir = function(dir) {
    if (test('-d', dir)) {
        rm('-rf', dir);
    }

    mkdir('-p', dir);

    return dir;
};

var section = function(header) {
    echo();
    echo('    ' + header.bold);
};

var done = function(res) {
    if (res.code === 0) {
        success();
    } else {
        fail();
    }
};

var success = function(text) {
    text = text || 'done';
    var s = isWin ? '»' : '✓';
    echo('    ' + s.green + ' ' + text.green);
};

var fail = function(text) {
    text = text || 'failed';
    var s = isWin ? '×' : '✘';
    echo('    ' + s.red + ' ' + text.red);
    exit(1);
};

