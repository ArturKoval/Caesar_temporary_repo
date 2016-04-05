'use strict';

(function (This, app)  {
    This.Router = Backbone.Router.extend({
        routes: {
            '': 'groups',
            '*home.html':'groups',
            'Events*path': 'events'
            //'*path': 'errorPage'
        },

        initialize: function () {
			// do you need something here?
        },
		
        events: function () {
            app.subRouters['Events'] || (app.subRouters['Events'] = new CS.Events.Router());
        },

        groups: function () {
            app.subRouters['Groups'] || (app.subRouters['Groups'] = new CS.Groups.Router());
        },

        errorPage: function () {
            app.mediator.publish('Show 404');
        }
    });
})(CS, app);