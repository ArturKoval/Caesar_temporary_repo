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

        sync: function (method, model, options) {
            var newModel = {},
                request = '';

            if (method === 'update' || method === 'create') {
                newModel = model.clone();
                newModel.unset('isChecked', {silent: true});

                request = Backbone.sync.call(newModel, method, newModel, options);
            } else {
                request = Backbone.sync.call(this, method, this, options);
            }

            return request;
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