(function (This) {
    This.Clock = Backbone.Model.extend({
        initialize: function() {
            this.updateTime();
            setInterval(this.updateTime.bind(this), 1000);
        },
      
        updateTime: function() {
            var now = new Date();

            this.set({
                hour: now.getHours(),
                minutes: now.getMinutes(),
                weekDay: now.getDate(),
                day: now.getDay(),
                year: now.getFullYear(),
                month: now.getMonth() + 1
            })
        },
      
        getTime: function() {
            var minutes =  this.get('minutes');

            if (minutes < 10) {
                minutes = '0' + minutes;
            }

            return this.get('hour') + ':' + minutes;
        },
      
        getDay: function() {
            var currentDay = this.get('day');

            return {
                0: 'Sunday',
                1: 'Monday',
                2: 'Tuesday',
                3: 'Wednesday',
                4: 'Thursday',
                5: 'Friday',
                6: 'Saturday'
            }[currentDay];
        },
      
        getDate: function() {
            var month = this.get('month');
        
            if (month < 10) {
                month = '0' + month;
            }
        
            return month + '/' + this.get('weekDay') + '/'
                + this.get('year').toString().substr(2,2);
        }
    });
})(CS.Messenger);