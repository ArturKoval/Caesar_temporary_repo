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
        	$day;

            for (var day in jsonGroup.weeks['04252016']) {

            	var $div =  this.$el.find('.'+timeRouter[jsonGroup.weeks['04252016'][day][0].startTime]);
            	$day = $($div[0].childNodes[nodeRouter[day]]);
            

            	var $smallView = $('<div class="activity"></div>');
	            $smallView.html(_.template([
	            	'<p> <%= title %> <br> <%= teacher %> <br> <%= room %> </p>'
	            ].join(''))(jsonGroup.weeks['04252016'][day][0]));

				$day.append($smallView);
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
        start: 12355757,
        demo1: 34215355,
        demo2: 23466741,
        demo3: 33545323,
        finish: 233445211
    },
    weeks: {
        '04252016':  {
			monday: [jsonA1, jsonA2],
		    tuesday: [jsonA3],
		    wednesday: [jsonA1],
		    thursday: [jsonA2],
		    friday: [jsonA1, jsonA2]
		}
    }
}
