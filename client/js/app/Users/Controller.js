'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'User: EditDialogCalled': 'showEditDialog',
            'User: userProfileCalled': 'showUserProfile',
            'User: ProfileUnfocused': 'hideUserProfile' 
        },

        initialize: function () {
            this.$photoEl = $('#icon');
            this.$modalEl = $('#modal-window');
            this.$menuEl = $('#right-menu');
            this.mediator = app.mediator;
            var u = new This.User(app.store.user);
            this.smallUserView = new This.SmallUserView({
                model: u // user should be here
            });
            this.$photoEl.append(this.smallUserView.render().el);
        },

        showEditDialog: function () {
            // var editView = new This.editView();

            // this.$modalEl.append(editView.render().el);
            console.log('EditView should be here');
        },

        showUserProfile: function (user) {
            this.largeUserView = new This.LargeUserView({
                model: user
            });

            this.$menuEl.append(this.largeUserView.render().el);
        },

        hideUserProfile: function () {
            this.largeUserView && this.largeUserView.hide();
        }
    });
})(CS.User, app);