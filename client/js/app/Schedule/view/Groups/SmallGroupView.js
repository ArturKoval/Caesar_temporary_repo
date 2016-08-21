'use strict';

(function (This, app) {
    This.SmallGroupView = Backbone.View.extend({
        className: 'small-group-view col-md-6',
        tagName: 'div',
        events: {
            'click': 'select'
        },

        initialize: function () {
            app.mediator.subscribe('Schedule: rendered', this.remove, {}, this);
            app.mediator.subscribe('Schedule: the only selected', this.deselect, {}, this);
        },

        render: function () {
            this.$el.html(templates.smallGroupTpl(this.model.toJSON()));
            return this;
        },

        select: function () {
            app.mediator.publish('Schedule: the only selected', this.model);
            // SS.log
            app.mediator.publish('Schedule: groups selected', this.model);
            this.$el.addClass('chosen');
        },

        deselect: function() {
            if (this.$el.hasClass('chosen')) {
                this.$el.removeClass('chosen');
            }
        }
    });
})(CS.Schedule, app);