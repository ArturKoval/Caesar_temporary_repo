'use strict';
(function (This, app) {
    This.ScheduleSmallGroupView = This.SmallGroupView.extend({
        select: function() {
            if (this.$el.hasClass('chosen')) {
                this.$el.removeClass('chosen');
            } else {
                this.$el.addClass('chosen');
            }
            app.mediator.publish('Schedule: group selected', this.model);
        }
    });
})(CS.Groups, app);
