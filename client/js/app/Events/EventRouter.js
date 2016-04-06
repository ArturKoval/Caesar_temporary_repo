'use strict';

(function (This, app)  {
    This.Router = Backbone.Router.extend({
        routes: {            
            'Events': 'getEvents',
            'Events/new': 'createEvent',
            'Events/:id/edit': 'editEvent',
            'Events*path': 'notFound'
        },

        initialize: function () {
            this.controller = new This.Controller();
            this.controller.start();
            
            cs.mediator.subscribe('RouteToEvents', this.navToEvents, null, this);
            cs.mediator.subscribe('ShowEventById', this.navToEventById, null, this);
            
            Backbone.history.loadUrl(Backbone.history.fragment);
        },

        navToEvents: function () {
            this.navigate('Events');
        },

        navToEventById: function (id) {
            this.navigate('Events/' + id);
        },

        getEvents: function () {
            this.controller.showAll();
        },

        createEvent: function () {
            this.controller.createView();
        },

        editEvent: function (id) {
            this.controller.editById(id);
        },

        notFound: function () {
            app.mediator.publish('Show 404');
        }
    });
})(CS.Events, app);




