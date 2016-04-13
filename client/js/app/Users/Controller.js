'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'User: edit-dialog-called': 'showEditDialog',
            'User: user-profile-called': 'showUserProfile',
        },

        initialize: function () {
            this.$photoEl = $('#icon');
            this.$modalEl = $('#modal-window');
            this.$menuEl = $('#right-menu');
			
            this.mediator = app.mediator;
            
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

        showUserProfile: function () {
            this.largeUserView.show();
        }
    });
})(CS.User, app);