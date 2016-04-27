'use strict';

(function (This, app) {
    This.ScheduleView = Backbone.View.extend({
        tagName: 'div',
        className: 'scheduleView',
        
        template: templates.scheduleTpl,
    
        events: {
            'click .monthBtn': function () { this.show('month') },
            'click .weekBtn':  function () { this.show('week') },
            'click .keyDatesBtn': function () { this.show('keyDates') }
        },
    
        render: function () {
            this.$el.append(this.template);

            return this;
        },
        
        show: function (selected) {
            console.log(selected);
        }
    });
})(CS.Schedule, app);