'use strict';

(function (This) {
    This.Location = Backbone.Model.extend({
        urlRoot: '/locations',

        defaults: function () {
            return {
                acronym: '',
                name: '',
                teachers: '',
                groups: '',
                isChecked: false
            };
        },

        sync: function(method, model, options) {
            var request = '';

            if (method === 'update' || method === 'create') {
                model.unset('isChecked', {silent: true});

                request = Backbone.sync.call(model, method, model, options);
            } else {
                request = Backbone.sync.call(this, method, this, options);
            }

            return request;
        },

        parse: function (data) {
            data.isChecked = false;

            return data;
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