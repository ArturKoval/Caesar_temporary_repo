'use strict';

(function (This, app)  {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'Error by route': 'showErrorPage'
        },

        initialize: function () {
            this.errorPageView = new This.ErrorPageView();
            this.mediator = app.mediator;
        },

        showErrorPage: function (args) {
            var elem = args.elem,
                message = args.message;

            elem.empty();
            elem.html(this.errorPageView.render({message: message}).el);
        }
    });
})(CS.ErrorPage, app);