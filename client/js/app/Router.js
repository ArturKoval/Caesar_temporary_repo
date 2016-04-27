'use strict';

(function (This, app)  {
    This.Router = Backbone.Router.extend({
        routes: {
            '': 'pageGroups',
            'Groups*path': 'pageGroups',
            'About*path': 'pageAbout',
            'Schedule*path': 'pageSchedule',
            '*path': 'errorPage'
        },

        subscribes: {
            'Menu: SelectedPage': 'navToChangePath'
        },

        initialize: function () {
            app.mediator.multiSubscribe(this.subscribes, this);
        },

        navToChangePath: function (path) {
            var routes = {
                About: 'About',
                Schedule: 'Schedule',
                Groups: 'Groups'
            };

            if(routes[path]) {
                this.navigate(routes[path], {trigger: true});
            }   
        },

        pageGroups: function () {
            app.subRouters['Groups'] || (app.subRouters['Groups'] = new CS.Groups.Router());
        },

        pageAbout: function () {
            app.subRouters['About'] || (app.subRouters['About'] = new CS.About.Router());
        },

        pageSchedule: function () {
            app.subRouters['Schedule'] || (app.subRouters['Schedule'] = new CS.Schedule.Router());
        },

        errorPage: function () {
           app.mediator.publish('Error: show-page-404');
        }
    });
})(CS, app);