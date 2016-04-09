'use strict';
(function (This) {
    This.Collection = Backbone.Collection.extend({
        model: This.Model
    });
})(CSAdmin);