'use strict';

(function (This) {
    This.LocationList = Backbone.Collection.extend({
        model: This.Location,

        getByName: function (name) {
            return this.findWhere(name);
        },

        getNames: function () {
            return this.map(function (location) {
                return location.get('name');
            });
        },

        comparator: function (model) {
            return model.get('name');
        },

        hasCheckedLocations: function () {
            return this.any(function (location) {
                return location.get('isChecked');
            });
        },

        getCheckedLocations: function () {
            return this.filter(function (location) {
                return location.get('isChecked');
            });
        },

        uncheckLocations: function () {
            this.forEach(function (location) {
                location.uncheck();
            });
        },

        checkOnlyOneLocation: function (location) {
            this.uncheckLocations();
            location.check();
        },

        //temp
        getCheckedLocationsNames: function () {
            return this.getCheckedLocations().map(function (checkedLocation) {
                return checkedLocation.get('name');
            });
        }
    });
})(CS.Locations);