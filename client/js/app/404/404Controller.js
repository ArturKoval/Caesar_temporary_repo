'use strict';

(function (This, app)  {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'Show 404': 'showAll'
        },

        initialize: function () {
            this.collectionView = new This.ErrorPageView();
            this.$el = $('#main');
            this.mediator = app.mediator;
            this.start();
        }
    });
})(CS.ErrorPage, app);