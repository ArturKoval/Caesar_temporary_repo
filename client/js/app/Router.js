'use strict';

(function (This, app)  {
    This.Router = Backbone.Router.extend({
        routes: {
            '': 'pageGroups',
            'Groups*path': 'pageGroups',
            'Students*path': 'pageStudents',
            'About*path': 'pageAbout',
            'Schedule*path': 'pageSchedule',
            '*path': 'errorPage'
        },

        subscribes: {
            'Menu: SelectedPage': 'navToChangePath',
            'Menu: Locations': 'navToLocations',
            'Locations: dialog-closed': 'navToCancelForm',
            'Locations: forRouter': 'navToSelectedLocations',
        },

        initialize: function () {
            app.mediator.multiSubscribe(this.subscribes, this);
        },

        navToChangePath: function (path) {
            var routes = {
                About: 'About',
                Schedule: 'Schedule',
                Groups: 'Groups',
                Students: 'Students'
            };

            if (routes[path]) {
                app.mediator.publish('Menu: changed-page');
                this.navigate(routes[path], {trigger: true});
            }
        },

        navToLocations: function () {
            let urlName = 'Locations';

            this.currentUrl = window.location.pathname;

            if (!~this.currentUrl.indexOf(urlName)) { //No matches
                this.navigate(this.currentUrl + '/' + urlName);
            }
        },

        navToCancelForm: function () {
            this.navigate(this.currentUrl);
        },

        navToSelectedLocations: function (arrLocations) {
            var locations = arrLocations.join('+');
            this.navigate(this.currentUrl.split('/', 2).join('/') + '/' + locations);
        },

        pageGroups: function () {
            app.subRouters['Groups'] || (app.subRouters['Groups'] = new CS.Groups.Router());
        },

        pageStudents: function () {
            app.subRouters['Students'] || (app.subRouters['Students'] = new CS.Students.Router());
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