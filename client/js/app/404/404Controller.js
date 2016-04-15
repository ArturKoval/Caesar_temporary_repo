'use strict';

(function (This, app)  {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'Error: show-error-page': 'showErrorPage',
            'Error: show-page-404': 'showPage404'
        },

        initialize: function () {
            this.mediator = app.mediator;
            this.errorPageView = new This.ErrorPageView();
            this.errorPageViewMain = new This.ErrorPageViewMain();
        },

        showErrorPage: function (args) {
            var elem = args.elem,
                message = args.message;

            elem.empty();
            elem.html(this.errorPageView.render({message: message}).el);
        },

        showPage404: function () {
            $('#modal-window').html(this.errorPageViewMain.render().$el);
        }
    });
})(CS.ErrorPage, app);