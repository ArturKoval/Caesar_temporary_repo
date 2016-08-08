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
            this.$el.empty();
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },

        showProfile: function () {
            app.mediator.publish('User: profile-request', this.model);
        }
    });
})(CS.User, app);