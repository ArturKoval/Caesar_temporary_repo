'use strict';

(function (This) {
    This.ScheduleView = Backbone.View.extend({
        tagName: 'div',
        className: 'schedule_view',
        template: templates.scheduleViewTpl,

        render: function() {
            this.collection.forEach(function(group) {
                if (group.name === 'DP-093-JS') {
                    this.$el.append(this.template(group));
                }
            }, this);
            
            return this;
        }
    });
})(CS.Groups);