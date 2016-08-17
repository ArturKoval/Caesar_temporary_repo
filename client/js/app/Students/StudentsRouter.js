'use strict';

(function (This, app) {
	This.Router = Backbone.Router.extend({
		currentUrl: 'Students',

		routes: {
			'': 'initLocation',
			'Students(/)': 'initLocation',
			'Students/Locations(/)': 'openWindowLocations',
		},

		subscribes: {
            'Groups: selected': 'navToGroupSelected'
        },

		initialize: function () {
            app.mediator.multiSubscribe(this.subscribes, this);
            this.controller = new This.Controller();

            Backbone.history.loadUrl(Backbone.history.fragment);
        },

        navToGroupSelected: function () {
        	alert('Selected!');
        },

        initLocation: function () {
            var locations = app.locationsController.getSelectedLocations(),
                arrLocations = locations.join('+');

            this.controller.start(locations);
            
            this.navigate('Students/' + arrLocations);
        },

        openWindowLocations: function () {
            app.locationsController.showLocations();
        },

	});
})(CS.Students, app);