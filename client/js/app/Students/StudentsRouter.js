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
            'Students: stubView-changed': 'navToGroupAction',
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
                this.navigate('Students/' + location + '/' + groupName + '/list');
            }
        },

        navToGroupAction: function (args) {
            var groupName = args.group.get('name'),
                location = args.group.get('location'),
                action = args.stubView; /**rename stub**/

            this.navigate('Students/' + location + '/' + groupName + '/' + action);
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

		openGroupAction: function (locations, group, action) {
            var arrLocations = locations.split('+'),
                actions = {
                    'list': true
                };

            if (actions[action]) {
                this.controller.showGroupViewByRoute(arrLocations, group, action);
            } else {
                this.controller.showGroupViewByRoute(arrLocations, groupName, 'list');
            }
        },

        openGroupInfo: function (loc, gN) {
            //
        },

        openWindowLocations: function () {
            console.log('and here');
            app.locationsController.showLocations();
        },

        notFound: function () {
            app.mediator.publish('Error: show-page-404');
        }

	});
})(CS.Students, app);