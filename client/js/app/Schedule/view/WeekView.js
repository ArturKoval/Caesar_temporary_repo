'use strict';

(function (This, app) {
    This.WeekView = Backbone.View.extend({
        tagName: 'div',
        className: 'scheduleWeek-view',
        template: templates.scheduleViewTpl,

        initialize: function () {
            this.nodeRouter = {'monday': 1, 'tuesday': 2, 'wednesday': 3, 'thursday': 4, 'friday': 5};
            this.timeRouter = {'09:00': 'nine', '09:30': 'nine-half', '10:00': 'ten', '10:30': 'ten-half', '11:00': 'eleven'};
            this.multiplierStore = {};
            this.multiplier = 0;
            if (this.collection) {
                this.model = locationSchedule;
            } else {
                this.model = groupSchedule;
            }
			

        },

        preRender: function () {
            for (var day in this.model.weeks['04252016']) {
                this.pushToActivityStore(day);
            }
        },

        render: function () {
            this.$el.html(this.template(this.model));

            this.renderIteration();

            return this;
        },

        renderIteration: function () {

            this.preRender();

            for (var day in this.model.weeks['04252016']) {
                this.model.weeks['04252016'][day].forEach(function (activity, i) {
                    var id = day + i;

                    var $div =  this.$el.find('.'+this.timeRouter[activity.startTime]);
                    var $day = $($div[0].childNodes[this.nodeRouter[day]]);

                    var activityView = new This.ActivityView({model: activity, style:  this.model.weeks['04252016'][day].length});
                    var $a = activityView.render().$el;
					

                    $a.css({
                        'width': (100/this.multiplierStore[id])+'%',
                        'height': (activity.duration*200 + Number(activity.duration)*1.6945)+'%',
                        'border-left': '1px dashed'
                    });

                    var value;

                    if (this.multiplierStore[id] > 1){
                        if (i % 2 !== 0 || i !== 0) {
                            value = (100/this.multiplierStore[id])+'%';
                        } else {
                            value = '0%';
                        }
                    }

                    if (day !== 'thursday'){
                        $a.css({
                             'margin-left': value
                        });
                    }
					
					$day.append($a);
					
				if ($a.width() < 50) {
						console.log('*');
						$a.find('p').remove();
					}
					
					$a.mouseover(function () {
						//console.log('*');
						var hints = [];
							if ($a.width() < 50) {
								$a.attr('name', i);
								hints.push({
									name: $a.attr('name'),
									text: activity.title + ' ' + activity.teacher + ' ' + activity.room 
								});
								
								
							}
						if (hints !== []) {
							
							app.mediator.publish('Message', {
								type: 'hints',
								$el: this.$el,
								hints: hints,
								coordinates: $a.offset()
							});
						}   
					}.bind(this));
					
					$a.mouseleave(function () {
					   this.$el.find('.hint').remove();
					}.bind(this));
    
                    
                }.bind(this));
            }
        },

        pushToActivityStore: function (day) {
            var dayActivityStore = {
                '09:00': [],
                '09:30': [],
                '10:00': [],
                '10:30': [],
                '11:00': []
            };

            
             this.model.weeks['04252016'][day].forEach(function (activity, i) {
                    for (var time in dayActivityStore) {
                        if (this.isLater(time, activity.startTime) && (this.isLater2(this.defineDuration(activity.startTime, activity.duration), time))) {
                            dayActivityStore[time].push(activity);
                        }
                    }
            }.bind(this));

             this.model.weeks['04252016'][day].forEach(function (activity, i) {
                var id = day + i;
                this.multiplierStore[id] = this.defineMultiplier(activity, dayActivityStore);

            }.bind(this));
        },

        isLater: function (stringA, stringB) {
            return this.convertToNumber(stringA) >= this.convertToNumber(stringB);
        },

        isLater2: function (stringA, stringB) {
            return this.convertToNumber(stringA) > this.convertToNumber(stringB);
        },

        defineMultiplier: function (activity, store) {
            var max = 0;
            for (var time in store) {
                if (store[time].indexOf(activity) > -1) {
                    var arr = store[time];
                    if (max < arr.length) {
                        max = arr.length;
                    }
                }
            }

            return max;
        },

        defineCss: function (multiplier, $div, duration) {
            $div.css({
                'width': (100/multiplier)+'%',
                'height': (duration*200)+'%',
                'margin-top': (duration*200)+'%',
                'margin-left': (multiplier*10)+'%'
            });
        },

        defineDuration: function (str, duration) {
            var number = this.convertToNumber(str);

            if (str.substr(3,1) === '3') {
                if (String(duration).length > 1) {
                    number+= 70 + String(duration).substr(0,1)* 100;
                } else {
                    number+= duration * 100;
                }
            } else {
                if (String(duration).length > 1) {
                    number+= 30 + String(duration).substr(0,1)* 100;
                } else {
                    number+= duration * 100;
                }
            }
            return this.convertToTimeString(number);
        },

        convertToTimeString: function (number) {
            var string = String(number);
            var result = '';
            if (string.length === 4) {
                result = string.substr(0,2) + ':' + string.substr(2,2);
            } else {
                result = '0'+ string.substr(0,1) + ':' + string.substr(1,2);
            }
            return result;
        },

        convertToNumber: function (timeString) {
            var string = timeString.replace(':', '');
            return Number(string);
        }
    });
})(CS.Schedule, app);

var jsonA1 = {
    'title': 'JS Practice',
    'teacher': 'D. Petin',
    'startTime': '09:00',
    'duration': '2',
    'room': '305'
}
var jsonA2 = {
    'title': 'Node.js Lecture',
    'teacher': 'D. Petin',
    'startTime': '09:30',
    'duration': '2',
    'room': '305'
}
var jsonA3 = {
    'title': 'Expert Meeting',
    'teacher': 'N. Varenko',
    'startTime': '10:00',
    'duration': '2',
    'room': '309'
}
var jsonA4 = {
    'title': 'Weekly Report',
    'teacher': 'D. Petin',
    'startTime': '10:00',
    'duration': '1',
    'room': '309'
}
var jsonA5 = {
    'title': 'Weekly Report',
    'teacher': 'D. Petin',
    'startTime': '10:30',
    'duration': '1',
    'room': '309'
}
var jsonA6 = {
    'title': 'JS Practice',
    'teacher': 'D. Petin',
    'startTime': '09:00',
    'duration': '1',
    'room': '305'
}

var groupSchedule = {
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
            tuesday: [jsonA2],
            wednesday: [jsonA6],
            thursday: [jsonA4],
            friday: [jsonA6]
        }
    }
}
var locationSchedule = {
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
            monday: [
            {
                'title': 'MQC',
                'teacher': 'D. Petin',
                'startTime': '09:00',
                'duration': '0.5',
                'room': '402'
            },
            {
                'title': 'JS Lecture',
                'teacher': 'D. Petin',
                'startTime': '09:30',
                'duration': '1',
                'room': '402'
            },
            {
                'title': '.NET',
                'teacher': 'O. Shvets',
                'startTime': '10:30',
                'duration': '0.5',
                'room': '405'
            }, 
            {
                'title': 'Java',
                'teacher': 'Mister X',
                'startTime': '11:00',
                'duration': '1',
                'room': '405'
            }],
            tuesday: [
            {
                'title': 'MQC Lecture',
                'teacher': 'D. Petin',
                'startTime': '09:00',
                'duration': '2',
                'room': '402'
            }, 
            {
                'title': 'Java',
                'teacher': 'Mister X',
                'startTime': '10:00',
                'duration': '1',
                'room': '405'
            },
            {
                'title': 'Node.js',
                'teacher': 'D. Petin',
                'startTime': '11:00',
                'duration': '1',
                'room': '402'
            }],
            wednesday: [
            {
                'title': 'Java',
                'teacher': 'Mister X',
                'startTime': '11:00',
                'duration': '1',
                'room': '405'
            }],
            thursday: [
            {
                'title': 'MQC Lecture',
                'teacher': 'D. Petin',
                'startTime': '09:30',
                'duration': '2',
                'room': '402'
            },
            {
                'title': 'Java',
                'teacher': 'Mister X',
                'startTime': '09:30',
                'duration': '2',
                'room': '403'
            },
            {
                'title': '.NET Lecture',
                'teacher': 'O. Shvets',
                'startTime': '09:30',
                'duration': '2',
                'room': '405'
            }],
            friday: [
            {
                'title': '.NET',
                'teacher': 'O. Shvets',
                'startTime': '10:30',
                'duration': '0.5',
                'room': '405'
            }, 
            {
                'title': 'Java',
                'teacher': 'Mister X',
                'startTime': '11:00',
                'duration': '1',
                'room': '405'
            }],
        }
    }
}
