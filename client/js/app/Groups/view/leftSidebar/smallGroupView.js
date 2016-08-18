'use strict';

(function (This, app) {
    This.SmallGroupView = Backbone.View.extend({
        className: 'small-group-view col-md-6',
        tagName: 'div',
        events: {
            'click': 'select'
        },

        initialize: function () {
            app.mediator.subscribe('Groups: rendered', this.remove, {}, this);
            app.mediator.subscribe('Groups: the only selected', this.deselect, {}, this);
        },

        render: function () {
            this.$el.html(templates.smallGroupTpl(this.model.toJSON()));
            return this;
        },

        select: function () {
            app.mediator.publish('Groups: the only selected', this.model);
            app.mediator.publish('Groups: selected', this.model);
            this.$el.addClass('chosen');
        },

        deselect: function() {
            if (this.$el.hasClass('chosen')) {
                this.$el.removeClass('chosen');
            }
        }
    });
})(CS.Groups, app);