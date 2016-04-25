'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'Menu: locations': 'showLocations',
            'Groups: saved': 'addGroup'
        },

        initialize: function () {
            this.mediator = app.mediator;
            this.$modalEl = $('#modal-window');
        },

        showLocations: function () {
            var locationListView = new CS.Locations.LocationListView({
                collection: store.locations
            });

            this.$modalEl.append(locationListView.render().el);
        },

        //temp
        addGroup: function (group) {
            var location;

            if (group.isNew()) {
                location = store.locations.getByName(group.get('location'));
                location.save('lastGroupNumber', location.get('lastGroupNumber') + 1);
            }
        }
    });
})(CS.Locations, app);