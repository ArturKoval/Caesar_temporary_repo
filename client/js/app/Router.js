'use strict';

(function (This, app)  {
    This.Router = Backbone.Router.extend({
        routes: {
            '': 'groups',
            'Groups': 'groups',
            'Groups*path': 'groups',
            '*path': 'errorPage'
        },

        initialize: function () {
            console.log('[init] Router');
        },

        groups: function () {
            app.subRouters['Groups'] || (app.subRouters['Groups'] = new CS.Groups.Router());
        },

        errorPage: function () {
            app.mediator.publish('Show 404');
        }
    });
})(CS, app);