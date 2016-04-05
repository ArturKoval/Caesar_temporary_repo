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
            console.log('*');
            this.controller = new This.Controller();
            //this.controller.start();
            this.navToGroups();
            //CS.mediator.subscribe('RouteToEvents', this.navToEvents, null, this);
            //CS.mediator.subscribe('ShowEventById', this.navToEventById, null, this);
            
            Backbone.history.loadUrl(Backbone.history.fragment);
        },

        navToGroups: function () {
            this.navigate('Groups');
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
})(CS.Groups, app);




