'use strict';

(function (This) {
    This.Location = Backbone.Model.extend({
        defaults: function () {
            return {
                acronym: '',
                name: '',
                teachers: '',
                groups: '',
                isChecked: false
            };
        },
        
        toggleCheck: function () {
            this.set('isChecked', !this.get('isChecked'));
        },
        
        check: function () {
            this.set('isChecked', true);
        },
        
        uncheck: function () {
            this.set('isChecked', false);
        }
    }); 
})(CS.Locations);