'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'Menu: locations': 'showLocations',
        },

        initialize: function () {
            this.mediator = app.mediator;
            this.$modalEl = $('#modal-window');
        },

        showLocations: function () {
            var locationListView = new CS.Locations.LocationListView({collection: store.locations});

            this.$modalEl.append(locationListView.render().el);
        }
    });
})(CS.Locations, app);