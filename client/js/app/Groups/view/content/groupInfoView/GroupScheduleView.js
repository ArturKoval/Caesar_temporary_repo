'use strict';

(function (This) {
    This.GroupScheduleView = Backbone.View.extend({
        tagName: 'div',
        className: 'schedule-container',

        template: templates.groupScheduleViewTpl,

        initialize: function () {
            this.weekView = new CS.Schedule.WeekView();
            //temp
            this.groupKeyDatesView = new This.GroupKeyDatesView({
                model: {
                    start: '02/01/2016',
                    demo1: '02/22/2016',
                    demo2: '03/14/2016',
                    offering: '04/04/2016',
                    finish:'04/25/2016'
                }
            });
        },

        render: function () {
            this.$el.html(this.template);
            this.$weekEl = this.$el.find('.week-wrapper');
            this.$keyDatesEl = this.$el.find('.key-dates-wrapper');

            this.$weekEl.html(this.weekView.render().el);
            this.$keyDatesEl.html(this.groupKeyDatesView.render().el);

            return this;
        }
    });
})(CS.Groups);