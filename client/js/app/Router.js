'use strict';

(function (This, app)  {
    This.Router = Backbone.Router.extend({
        routes: {
            '': 'events',
            'Events*path': 'events',
            '*path': 'errorPage'
        },

        initialize: function () {
			// do you need something here?
        },
		
        events: function () {
            app.subRouters['Events'] || (app.subRouters['Events'] = new CS.Events.Router());
        },

        errorPage: function () {
            app.mediator.publish('Show 404');
        }
    });
})(CS, app);