'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'User: EditDialogCalled': 'showEditDialog',
            'User: userProfileCalled': 'showUserProfile',
        },

        initialize: function () {
            this.$photoEl = $('#icon');
            this.$modalEl = $('#modal-window');
            this.$menuEl = $('#right-menu');
            this.mediator = app.mediator;
            this.user = new This.User(app.store.users[1]);
            this.smallUserView = new This.SmallUserView({
                model: this.user
            });
            this.largeUserView =  new This.LargeUserView({
                model: this.user,
                el: this.$menuEl
            });
            this.$photoEl.append(this.smallUserView.render().el);
            this.largeUserView.render();
        },

        showEditDialog: function () {
            //add editView here
        },

        showUserProfile: function (user) {
            this.largeUserView.show();
        }
    });
})(CS.User, app);