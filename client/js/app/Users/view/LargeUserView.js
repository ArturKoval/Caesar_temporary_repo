'use strict';

(function (This, app) {
    This.LargeUserView = Backbone.View.extend({
        template: templates.largeUserViewTpl,

        events: {
            'click .btn-edit': 'showEditDialog',
            'click .btn-logout': 'logout',
            'mouseleave': 'hide',
            'mouseover': 'show'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);

            Backbone.Validation.bind(this);
        },

        render: function () {
            this.model.validate();

            this.$el.empty();

            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },

        showEditDialog: function () {
            app.mediator.publish('User: edit-request', this.model);
        },

        logout: function () {
            app.mediator.publish('User: logged-out', this.model);
        },

        show: function () {
            if (this.timerId) {
                clearTimeout(this.timerId);
            }

            this.$el.addClass('open');
        },

        hide: function () {
            this.timerId = setTimeout(function () {
                this.$el.removeClass('open');
            }.bind(this), 500);
        }
    });
})(CS.User, app);