'use strict';

(function (This) {
    This.ScheduleView = Backbone.View.extend({
        tagName: 'div',
        className: 'schedule_view',
        template: templates.scheduleViewTpl,

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
})(CS.Groups);