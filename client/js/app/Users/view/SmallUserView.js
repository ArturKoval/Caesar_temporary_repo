'use strict';

(function (This, app) {
    This.SmallUserView = Backbone.View.extend({
        tagName: 'div',
        className: 'user-photo',

        template: templates.smallUserViewTpl,

        events: {
            'click': 'showProfile'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            if (this.model.toJSON().photo === "") {
                this.model.attributes.photo = "/img/default-photo.png"
            }
            this.$el.empty();
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },

        showProfile: function () {
            app.mediator.publish('User: profile-request', this.model);
        }
    });
})(CS.User, app);