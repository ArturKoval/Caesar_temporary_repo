'use strict';
(function (This, app)  {
    This.Router = Backbone.Router.extend({

        routes: {    
            'Schedule(/)': 'renderPageSchedule',
            'Schedule*path': 'notFound' 
        },

        initialize: function () {
            this.controller = new This.Controller();
            Backbone.history.loadUrl(Backbone.history.fragment);    
        },

        renderPageSchedule: function () {
            var locations = app.locationsController.getSelectedLocations();

            this.controller.start(locations);
        },

        notFound: function () {
            app.mediator.publish('Error: show-page-404');
        }
        
    });
})(CS.Schedule, app);