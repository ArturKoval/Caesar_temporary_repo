'use strict';

(function (This, app) {
    This.SmallGroupView = Backbone.View.extend({
        className: 'small-group-view col-md-6',
        tagName: 'div',
        events: {
            'click': 'select'
        },

        initialize: function () {
            app.mediator.subscribe('Students: rendered', this.remove, {}, this);
            app.mediator.subscribe('Students: the only selected', this.deselect, {}, this);
        },

        render: function () {
            this.$el.html(templates.smallGroupTpl(this.model.toJSON()));
            return this;
        },

        select: function () {
            app.mediator.publish('Students: the only selected', this.model);
            // SS.log
            app.mediator.publish('Students: groups selected', this.model);
            this.$el.addClass('chosen');
        },

        deselect: function() {
            if (this.$el.hasClass('chosen')) {
                this.$el.removeClass('chosen');
            }
        }
    });
})(CS.Students, app);