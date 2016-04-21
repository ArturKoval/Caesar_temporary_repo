'use strict';

(function (This, app) {
    This.SmallGroupView = Backbone.View.extend({
        tagName: 'div',
        className: 'small-group-view col-md-6',
        events: {
            'click': 'selectGroup'
        },

        initialize: function () {
            app.mediator.subscribe('Groups: rendered', this.remove.bind(this));
            this.model.on('destroy', this.remove, this);
            this.model
        },

        render: function () {
            this.$el.html(templates.smallGroupTpl(this.model.toJSON()));
            return this;
        },

        selectGroup: function () {
            if (this.$el.hasClass('chosen')) {
                $('.small-group-view').removeClass('chosen');
            } else {
                $('.small-group-view').removeClass('chosen');
                this.$el.addClass('chosen');
                app.mediator.publish('Groups: selected', this.model);
            }
        }
    });
})(CS.Groups, app);