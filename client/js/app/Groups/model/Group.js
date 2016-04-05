'use strict';

(function (This) {
    This.Group = Backbone.Model.extend({
        defaults: function () {
            return {
                name: '',
                location: '',
                budgetOwner: '',
                direction: '',
                startDate: '',
                finishDate: '',
                teachers: [],
                experts: [],
                stage: ''
            }
        },

        urlRoot: '/groups',

        validation: {
            name: [{
                    maxLength: 35,
                    msg: 'Max length is 35 symbols'
                }, {
                    minLength: 2,
                    msg: 'Min length is 2 symbols'
                }, {
                    required: true,
                    msg: 'Field cannot be empty'
                }, {
                    pattern: 'eventNameRegEx',
                    msg: 'Latin alphabet only. Allowed symbols: ,.-/+'
                }],
            type: [{
                    required: true,
                    msg: 'Select type'
                }]
        }
    });
})(CS.Groups);