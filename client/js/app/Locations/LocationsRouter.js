'use strict';
(function (This, app)  {
    This.Router = Backbone.Router.extend({
        currentUrl: 'Locations',

        subscribes: {
            'Menu: locations': 'navToLocations'
        },

        routes: {
            'Locations(/)': 'openLocations'
        },

        initialize: function () {
            app.mediator.multiSubscribe(this.subscribes, this);
            this.controller = This.Controller();
            Backbone.history.loadUrl(Backbone.history.fragment);
        },

        navToLocations: function () {

            this.navigate('Locations');
        },

        openLocations: function () {
            this.controller.showLocations();
        }
    });
})(CS.Locations, app);