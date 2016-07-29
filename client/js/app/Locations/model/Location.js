'use strict';

(function (This) {
    This.Location = Backbone.Model.extend({
        urlRoot: '/locations',
        isChecked: false,

        defaults: function () {
            return {
                acronym: '',
                name: '',
                teachers: '',
                groups: ''
            };
        },

        toggleCheck: function () {
            this.isChecked = !this.isChecked;
            this.triggerCheck();
        },

        check: function () {
            this.isChecked = true;
            this.triggerCheck();
        },

        uncheck: function () {
            this.isChecked = false;
            this.triggerCheck();
        },

        triggerCheck: function () {
            this.trigger('change:isChecked');
        }
    });
})(CS.Locations);