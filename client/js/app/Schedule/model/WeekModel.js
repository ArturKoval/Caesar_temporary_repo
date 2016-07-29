'use strict';

(function (This, i) {
    This.Week = Backbone.Model.extend({ 
        defaults: function () {
            return {
                monday: [],
                tuesday: [],
                wednesday: [],
                thursday: [],
                friday: []
            }
        }     
    });
})(CS.Schedule, i);