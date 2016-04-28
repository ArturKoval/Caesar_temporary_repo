'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'Menu: Locations': 'showLocations',
            'Groups: saved': 'addGroup',
            'Locations: selected': function (locations) {
                this.selectedLocation = locations;
            }
        },

        initialize: function () {
            this.mediator = app.mediator;
            this.$modalEl = $('#modal-window');
            this.selectedLocation = [app.user.get('location')];
        },

        showLocations: function () {
            var locationListView = new CS.Locations.LocationListView({
                collection: store.locations
            });

            this.$modalEl.append(locationListView.render().el);
        },

        getLocations: function (locations) {
            return this.selectedLocation;
        },
        
        //temp
        addGroup: function (group) {
            var location = {};

            if (group.isNew()) {
                location = store.locations.getByName(group.get('location'));
                location.save('lastGroupNumber', location.get('lastGroupNumber') + 1);
            }
        }
    });
})(CS.Locations, app);