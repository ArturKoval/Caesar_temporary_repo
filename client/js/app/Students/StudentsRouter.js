'use strict';

(function (This, app) {
	This.Router = Backbone.Router.extend({
		currentUrl: 'Students',

		routes: {
            '': 'initLocation',
			'Students(/)': 'initLocation',
			'Students/Locations(/)': 'openWindowLocations',
            'Students/:location/:group(/)': 'openGroupInfo',
		},

		subscribes: {
            'Students: group selected': 'navToGroupSelected'
        },

		initialize: function () {
            console.log('And here');
            app.mediator.multiSubscribe(this.subscribes, this);

            this.controller = new This.Controller();
            this.initLocation();
        },

        navToGroupSelected: function (model) {
            var groupName = model.get('name'),
                location = model.get('location');

            if (Backbone.history.fragment.indexOf('+') === -1) {
                this.navigate('Students/' + location + '/' + groupName + '/info');
            }
        },

        initLocation: function () {
            var locations = app.locationsController.getSelectedLocations(),
                arrLocations = locations.join('+');

            console.dir(locations);

            this.controller.start(locations);

            this.navigate('Students/' + arrLocations);
        },

        openGroupInfo: function (loc, gN) {
            console.log(loc);
            console.log(gN);
        },

        // openGroupInfo: function (locations, groupName) {
        //     var arrLocations = locations.split('+'),
        //         modelGroup = this.controller.showGroupViewByRoute(arrLocations, groupName, 'info');

        //     if (modelGroup) {
        //         this.navigate('Groups/' + locations + '/' + groupName + '/info');
        //     }
        // },

        openWindowLocations: function () {
            app.locationsController.showLocations();
        },

	});
})(CS.Students, app);