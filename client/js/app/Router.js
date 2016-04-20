'use strict';

(function (This, app)  {
    This.Router = Backbone.Router.extend({
        routes: {
            '': 'pageGroups',
            'Groups*path': 'pageGroups',
            'About': 'pageAbout',
            'About*path':'pageAbout',
            '*path': 'errorPage'
        },

        pageGroups: function () {
            app.subRouters['Groups'] || (app.subRouters['Groups'] = new CS.Groups.Router());
        },

        pageAbout: function () {
            app.subRouters['About'] || (app.subRouters['About'] = new CS.About.Router());
        },

        errorPage: function () {
           app.mediator.publish('Error: show-page-404');
        }
    });
})(CS, app);