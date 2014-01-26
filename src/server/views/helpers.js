var path = require("path");
var Handlebars = require("handlebars");


Handlebars.registerHelper('css_import', function(file) {
    var isLess = path.extname(file) === ".less";

    return new Handlebars.SafeString(
        '<link rel="stylesheet' +
            (isLess ? '/less" ' : '" ') +
        'type="text/css" href="' + file + '" />'
    );
});
