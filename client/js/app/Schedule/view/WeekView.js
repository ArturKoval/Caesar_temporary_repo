'use strict';

(function (This) {
    This.WeekView = Backbone.View.extend({
        tagName: 'div',
        className: 'schedule-view',
        template: templates.scheduleViewTpl,

        render: function() {
            this.$el.html(this.template(jsonGroup));

            var nodeRouter = {
                monday: 1,
                tuesday: 2,
                wednesday: 3,
                thursday: 4,
                friday: 5
            }, timeRouter = {
                '9:00': 'nine',
                '9:30': 'nine-half',
                '10:00': 'ten'
            },
            $day,
            keyDateScheduleView;

            for (var day in jsonGroup.weeks['04252016']) {

                var $div =  this.$el.find('.'+timeRouter[jsonGroup.weeks['04252016'][day][0].startTime]);
                $day = $($div[0].childNodes[nodeRouter[day]]);


                var $smallView = $('<div class="activity"></div>');
                $smallView.html(_.template([
                    '<p> <%= title %> <br> <%= teacher %> <br> <%= room %> </p>'
                ].join(''))(jsonGroup.weeks['04252016'][day][0]));
				
				$day.append($smallView);
				
				if (jsonGroup.weeks['04252016'][day][1]) {
					var $smallView2 = $('<div class="activity"></div>');
					$smallView2.html(_.template([
						'<p> <%= title %> <br> <%= teacher %> <br> <%= room %> </p>'
					].join(''))(jsonGroup.weeks['04252016'][day][1]));
					$day.append($smallView2);
					$smallView2.css({'width': '50%'});
					$smallView2.css({'border-left': '1px solid black'});
					$smallView.css({'width': '50%'});
				}
            }

            return this;
        }
    });
})(CS.Schedule);

var jsonA1 = {
    'title': 'JS Lecture',
    'teacher': 'D. Petin',
    'startTime': '9:00',
    'duration': '30',
    'room': '305'
}
var jsonA2 = {
    'title': 'Node.js Lecture',
    'teacher': 'D. Petin',
    'startTime': '9:00',
    'duration': '30',
    'room': '305'
}
var jsonA3 = {
    'title': 'Expert Meeting',
    'teacher': 'N. Varenko',
    'startTime': '9:30',
    'duration': '30',
    'room': '309'
}

var jsonGroup = {
    'groupName': 'DP-093-JS',
    'keyDates': {
        start: '02/01/2016',
        demo1: '02/22/2016',
        demo2: '03/14/2016',
        offering: '04/04/2016',
        finish:'04/25/2016'
    },
    weeks: {
        '04252016':  {
            monday: [jsonA1],
            tuesday: [jsonA3, jsonA3],
            wednesday: [jsonA1, jsonA3],
            thursday: [jsonA2],
            friday: [jsonA1, jsonA2]
        }
    }
}
