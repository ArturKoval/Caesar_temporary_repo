'use strict';

(function (This) {
    This.User = Backbone.Model.extend({
        defaults: function () {
            return {
                firstName: '',
                lastName: '',
                location: 'Unknown',
                role: 'Teacher',
                photo: '/img/default-photo.png'
            };
        },

        initialize: function () {
            this.on('validated:invalid', this.error, this);
        },

        error: function (model, errors) {
            for (let erorr in errors) {
                alert(errors[erorr]);
            }
        },

        validation: {
            firstName: [{
                maxLength: 20
            }, {
                minLength: 4
            }, {
                pattern: /^[a-z ,.'-]+$/i,
                msg: 'Please enter valid name. Allowed symbols: a-z ,.\'-'
            }],

            lastName: [{
                maxLength: 20
            }, {
                minLength: 4
            }, {
                pattern: /^[a-z ,.'-]+$/i,
                msg: 'Please enter valid name. Allowed symbols: a-z ,.\'-'
            }],

            photo: {
                pattern: /([a-z0-9\s_\\.\-:])+(.png|.jpe?g|.gif)$/i,
                msg: 'Please upload image file.'
            }
        },

        getFullName: function () {
            return this.get('firstName') + ' ' + this.get('lastName');
        },

        getShortName: function () {
            return this.get('firstName').charAt(0) + '. ' + this.get('lastName');
        },

        isLocation: function (location) {
            return this.get('location') === location;
        },

        isRole: function (role) {
            return this.get('role') === role;
        }
    });
})(CS.User);
