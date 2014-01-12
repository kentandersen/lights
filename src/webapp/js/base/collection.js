define(function(require) {

    var Backbone = require('backbone');
    var sync = require('component/sync');

    var Collection = Backbone.Collection.extend({

        sync: sync

    });

    return Collection;

});
