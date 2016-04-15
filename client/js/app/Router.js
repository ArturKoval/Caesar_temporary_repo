'use strict';

(function (This, app)  {
    This.Router = Backbone.Router.extend({
        routes: {
            '': 'groups',
            'Groups*path': 'groups',
            '*path': 'errorPage'
        },

        groups: function () {
            app.subRouters['Groups'] || (app.subRouters['Groups'] = new CS.Groups.Router());
        },

        errorPage: function () {
           app.mediator.publish('Error: show-page-404');
        }
    });
})(CS, app);