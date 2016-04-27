'use strict';
(function (This, app)  {
    This.Router = Backbone.Router.extend({

        routes: {    
            'Schedule(/)': 'renderPageSchedule',
            'Schedule*path': 'notFound' 
        },

        initialize: function () {
            this.controller = new CS.Schedule.Controller();
            Backbone.history.loadUrl(Backbone.history.fragment); 
            
        },

        renderPageSchedule: function () {
            this.controller.start();
        },

        notFound: function () {
            app.mediator.publish('Error: show-page-404');
        }
        
    });
})(CS.Schedule, app);