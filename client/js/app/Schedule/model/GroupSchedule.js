'use strict';

(function (This, i) {
    This.GroupSchedule = Backbone.Model.extend({ 
        defaults: function () {
            return {
                groupName: '',
                keyDates: {},
                weeks: {}
            }
        }    
    });
})(CS.Schedule, i);

/*      Example of creating GroupShedule

var jsonA1 = {
    'title': 'JS Lecture',
    'teacher': 'D. Petin',
    'startTime': '15-00',
    'duration': '60',
    'room': '305'
}
var jsonA2 = {
    'title': 'Node.js Lecture',
    'teacher': 'D. Petin',
    'startTime': '16-00',
    'duration': '30',
    'room': '305'
}

var jsonWeek = {
    monday: [new CS.Schedule.Activity(jsonA1), new CS.Schedule.Activity(jsonA2)],
    tuesday: [],
    wednesday: [new CS.Schedule.Activity(jsonA1)],
    thursday: [new CS.Schedule.Activity(jsonA2)],
    friday: [new CS.Schedule.Activity(jsonA1), new CS.Schedule.Activity(jsonA2)]
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
        '04252016': new CS.Schedule.Week(jsonWeek)
    }
}

//var model = new CS.Schedule.GroupSchedule(jsonGroup);
//console.log(model);
*/
