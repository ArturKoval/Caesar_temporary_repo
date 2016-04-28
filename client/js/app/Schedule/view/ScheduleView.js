'use strict';

(function (This, app) {
    This.ScheduleView = Backbone.View.extend({
        tagName: 'div',
        className: 'scheduleView',
        
        template: templates.scheduleTpl,
    
        events: {
            'click .monthBtn': function () { this.show('month'), this },
            'click .weekBtn':  function () { this.show('week') },
            'click .keyDatesBtn': function () { this.show('keyDates') }
        },
    
        render: function () {
            this.$el.append(this.template);

			this.$container = this.$el.find('.scheduleContainer');

            return this;
        },
        
        show: function (selected) {
			var schedule = {
				'month': function () {
					var monthView = new This.MonthView();

					this.$container.html(monthView.render(new Date().getFullYear(), new Date().getMonth()).el);
				}.bind(this),

				'week': function () {
					return console.log('week');
				},
				'keyDates': function () {
					return console.log('keyDates');
				}
			};

			return schedule[selected]();
        }
    });
})(CS.Schedule, app);