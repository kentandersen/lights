require('shelljs/make');
require('colors');

var _ = require('underscore'),
    fs = require('fs'),
    glob = require('glob'),
    path = require('path'),
    zlib = require('zlib'),
    hogan = require('hogan.js'),
    moment = require('moment');

var isWin = (process.platform === 'win32');

/*** CONFIG ********/

var version = process.env.VERSION || moment().format('YYYYMMDD');
    targetDir = process.env.OUTPUT_DIR || path.join('build', 'public');

var webapp = path.join('src', 'public'),
    config = path.join('config'),

    indexFile = path.join(webapp, 'index.mustache'),
    mainLessFile = path.join(webapp, 'css', 'app.less'),

    jsFileName = 'app-' + version + '.js',
    jsFile = path.join(targetDir, jsFileName),
    cssFileName = 'style-' + version + '.css',
    cssFile = path.join(targetDir, cssFileName);

    rjsConfig = path.join(config, 'buildconfig.js'),
    jshintConfig = path.join(config, 'jshint.json');


/*** TARGETS ********/

target.all = function() {
    target.jshint();
    target.test();
    target.build();
};

target.jshint = function() {
    var files = glob.sync(path.join(webapp, 'js', '**', '*.js'));

    section('Running JSHint');
    npmBin('jshint', '--config ' + jshintConfig, files.join(' '));
};

target.test = function() {
    section('Running JavaScript tests');
    npmBin('karma', 'start', 'karma.conf.js', '--browsers PhantomJS', '--single-run');
};

target.build = function() {
    createCleanDir(targetDir);

    buildIndexHtml();
    buildJavaScript();
    buildCss();

    echo();echo();
    success("Build succeeded!");
};


/*** APP FUNCTIONS ********/

var buildIndexHtml = function() {
    var htmlFile = path.join(targetDir, 'index.html');

    section('Building HTML → ' + htmlFile);
    renderAndWriteMustache(indexFile, htmlFile, {
        cssFile: cssFileName,
        jsFile: jsFileName
    });
};

var buildJavaScript = function() {
    console.log(rjsConfig, jsFile);
    section('Building JavaScript → ' + jsFile);
    npmBin('r.js', '-o ' + rjsConfig, 'out=' + jsFile);
};

var buildCss = function() {
    section('Building Less → ' + cssFile);
    npmBin('lessc', mainLessFile, cssFile);
};

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
var npmBin = function(name) {
    var bin = path.join('node_modules', '.bin', name);

    if (!test('-e', bin)) {
        echo('Binary does not exist: ' + bin);
        exit(1);
    }

    var res = exec(bin + ' ' + _.rest(arguments).join(' '));
    done(res);
}

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

