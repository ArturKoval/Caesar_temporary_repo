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
            this.$el.html(this.template);

			this.$container = this.$('.scheduleContainer');
			this.$monthButton = this.$('.monthBtn');
			this.$weekButton = this.$('.weekBtn');
			this.$keyDatesButton = this.$('.keyDatesBtn');
			this.$btn = this.$('.scBtn');
            
            this.show('month');

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
					var weekView = new This.WeekView({collection: true});

					this.$container.html(weekView.render().el);
					this.$weekButton.addClass('active');
				}.bind(this),

				'keyDates': function () {
					var keyDatesListView = new This.KeyDatesListView({
						collection: [{
							groupName: 'DP-093-JS',
							keyDates: {
								start: '12/12/2015',
                                demo1: '12/12/2015',
                                demo2: '12/12/2015',
								offering: '12/12/2015',
								finish: '12/12/2014'
							}
						}, {
							groupName: 'DP-094-MQC',
							keyDates: {
								start: '12/12/2015',
                                demo1: '12/12/2015',
                                demo2: '12/12/2015',
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