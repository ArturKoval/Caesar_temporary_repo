'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'Messenger: Confirmation window open': 'showConfirmation'
        },

        initialize: function () {
           this.mediator = app.mediator;
        },

        showConfirmation: function (data) {
            var m = new This.Message(data),
                view = new This.ConfirmationView({model: m});
                console.log(data);
            $('#modal-window').html(view.render().$el);
        }
    });
})(CS.Messenger, app);