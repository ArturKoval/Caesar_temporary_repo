'use strict';

(function (This) {
    This.LocationList = Backbone.Collection.extend({
        model: This.Location,
    });
})(CS.Locations);