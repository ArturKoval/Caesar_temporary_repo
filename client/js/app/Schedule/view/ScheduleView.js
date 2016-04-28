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

			this.$container = this.$el.find('.scheduleContainer');
			this.$monthButton = this.$el.find('.monthBtn');
			this.$weekButton = this.$el.find('.weekBtn');
			this.$keyDatesButton = this.$el.find('.keyDatesBtn');
			this.$btn = this.$el.find('.scBtn');

            return this;
        },
        
        show: function (selected) {
			var schedule = {
				'month': function () {
					var monthView = new This.MonthView();

					this.$container.html(monthView.render().el);
					this.$monthButton.addClass('active');
				}.bind(this),

				'week': function () {
					var weekView = new This.WeekView();

					this.$container.html(weekView.render().el);
					this.$weekButton.addClass('active');
				}.bind(this),

				'keyDates': function () {
					var keyDatesListView = new This.KeyDatesListView({
						collection: [{
							groupName: 'GROUP',
							keyDates: {
								start: '12/12/2015',
								offering: '12/12/2015',
								finish: '12/12/2014'
							}
						}, {
							groupName: 'GROUP22123123',
							keyDates: {
								start: '12/12/2015',
								offering: '12/12/2015',
								finish: '12/12/2014'
							}
						}]
					});
					
					this.$container.html(keyDatesListView.render().el);
					this.$keyDatesButton.addClass('active');
				}.bind(this)
			};

			this.$btn.removeClass('active');

			return schedule[selected]();
        }
    });
})(CS.Schedule, app);