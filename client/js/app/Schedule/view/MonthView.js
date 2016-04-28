//start this module with next code;
//var monthView = new CS.Schedule.MonthView();
//$('#main-section').html(monthView.render(new Date().getFullYear(), new Date().getMonth()).el);

(function (This, app) {
    This.MonthView = Backbone.View.extend({

        months: ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"],
        shownMonth: new Date().getMonth(),
        shownYear: new Date().getFullYear(),
        className: 'calendarView',

        events: {
            'click .prevMonth': function () {this.toggleMonth('prev')},
            'click .nextMonth': function () {this.toggleMonth('next')},
            'click tr': 'selectWeek'
        },

        render: function (year, month) {
			if (!year) {
				year = new Date().getFullYear();
				month = new Date().getMonth();
			}
			
            this.$el.html(templates.calendar({month: this.months[month]}));
            this.calendar = this.$el.find('.calendar');

            var date = new Date(year, month),
                table = templates.dayNames(),
                weekNum = 1,
                i, j;

            for (i = 0; i < getDay(date); i++) {
                table += '<td></td>';
            }

            while (date.getMonth() === month) {
                table += templates.day({day: date.getDate()});

                if (getDay(date) % 7 == 6) {
                    table += templates.weekRow({weekNum: weekNum++})
                }

                date.setDate(date.getDate() + 1);
            }

            if (getDay(date) !== 0) {
                for (j = getDay(date); j < 7; j++) {
                    table += '<td></td>';
                }
            }

            table += '</tr></table>';

            function getDay(date) { //returns monday first, not Sunday as usual;
                var day = date.getDay();
                if (day === 0) {
                    day = 7
                }
                return day - 1;
            }

            this.calendar.html(table);
            app.mediator.publish('Schedule: select-month', this.shownYear);
            return this;
        },

        toggleMonth: function (month) {
            if (month === 'prev') {
                this.shownMonth -= 1;
            } else if (month === 'next') {
                this.shownMonth += 1;
            }

            if (this.shownMonth === -1) {
                this.shownMonth = 11;
                this.shownYear -= 1;
            }

            if (this.shownMonth === 12) {
                this.shownMonth = 0;
                this.shownYear += 1;
            }

            this.render(this.shownYear, this.shownMonth)
        },

        selectWeek: function(e) {
            var week = $(e.currentTarget).attr("weeknum");
            if (week !== undefined) {
                app.mediator.publish('Week: selected', ('month: ' + this.shownMonth + ' week: ' + week));
            }
        }
    });
})(CS.Schedule, app);