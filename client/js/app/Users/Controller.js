'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'User: edit-request': 'showEditDialog',
            'User: profile-request': 'showProfile',
            'User: on-invalid': 'showErrorAlert'
        },

        initialize: function () {
            this.mediator = app.mediator;

            this.$photoEl = $('#icon');
            this.$modalEl = $('#modal-window');
            this.$menuEl = $('#right-menu');

            this.smallUserView = new This.SmallUserView({
                model: app.user
            });
            this.largeUserView = new This.LargeUserView({
                model: app.user,
                el: this.$menuEl
            });

            this.$photoEl.append(this.smallUserView.render().el);
            this.largeUserView.render();
        },

        showEditDialog: function () {
            //add editView here
        },

        showErrorAlert: function (error) {
            var messager = new CS.Messenger.ConfirmationView({
                model: new This.User({value: error})
            });

            $('#modal-window').html(messager.render().el);
        },

        showProfile: function () {
            this.largeUserView.show();
        }
    });
})(CS.User, app);