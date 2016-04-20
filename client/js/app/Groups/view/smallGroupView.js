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
        },

        render: function () {
            this.$el.html(templates.smallGroupTpl(this.model.toJSON()));
            return this;
        },

        selectGroup: function () {
            app.mediator.publish('Groups: selected', this.model);
            $('.small-group-view').removeClass('chosen');
            this.$el.addClass('chosen');
        }
    });
})(CS.Groups, app);