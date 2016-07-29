'use strict';

(function (This, i) {
    This.Activity = Backbone.Model.extend({ 
        defaults: function () {
            return {
                title: '',
                teacher: '',
                startTime: '',
                duration: '',
                room: ''
            }
        }     
    });
})(CS.Schedule, i);