'use strict';
(function (This, app)  {
    This.Router = Backbone.Router.extend({

        routes: {    
            'About(/)': 'renderPageAbout',
            'About*path': 'notFound',
            'About/:direction': 'showDirection' //edition
        },

        initialize: function () {
            this.controller = new This.Controller();
            Backbone.history.loadUrl(Backbone.history.fragment);    
        },

        renderPageAbout: function () {
            this.controller.showDirectionContributors();
        },

        notFound: function () {
            app.mediator.publish('Error: show-page-404');
        }  

    });
})(CS.About, app);