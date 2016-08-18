'use strict';

(function (This, app) {
	This.Router = Backbone.Router.extend({
		currentUrl: 'Students',

		routes: {
            '': 'initLocation',
			'Students(/)': 'initLocation',
			'Students/Locations(/)': 'openWindowLocations',
            'Students/:location(/)': 'openLocation',
            'Students/:location/:group(/)': 'openGroupInfo',
            'Students/:location/:group/:action(/)': 'openGroupAction',
            'Students*path': 'notFound'
		},

		subscribes: {
            'Students: groups selected': 'navToGroupSelected'
        },

		initialize: function () {
            app.mediator.multiSubscribe(this.subscribes, this);

            this.controller = new This.Controller();

            Backbone.history.loadUrl(Backbone.history.fragment);
        },

        navToGroupSelected: function (model) {
            var groupName = model.get('name'),
                location = model.get('location');

            if (~Backbone.history.getFragment().indexOf(this.currentUrl) && Backbone.history.fragment.indexOf('+') === -1) {
                this.navigate('Students/' + location + '/' + groupName + '/info');
            }
        },

        initLocation: function () {
            var locations = app.locationsController.getSelectedLocations(),
                arrLocations = locations.join('+');

            this.controller.start(locations);

            this.navigate('Students/' + arrLocations);
        },

        openLocation: function (locations) {
            var arrLocations = locations.split('+');

            this.controller.showLocationByRoute(arrLocations);
        },        

		openGroupAction: function (loc, gN) {
            //
        },

        openGroupInfo: function (loc, gN) {
            //
        },

        openWindowLocations: function () {
            app.locationsController.showLocations();
        },

        notFound: function () {
            app.mediator.publish('Error: show-page-404');
        }

	});
})(CS.Students, app);