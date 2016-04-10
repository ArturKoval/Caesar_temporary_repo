'use strict';

(function (This) {
    This.User = Backbone.Model.extend({
        urlRoot: '/users',
        
        defaults: function () {
            return {
                firstName: 'John',
                lastName: 'Hankock',
                location: 'Unknown',
                role: 'ITA Teacher',
                photo: '/img/default-photo.png'
            };
        },
        
        validation: {
            firstName: [{
                maxLength: 20,
            }, {
                minLength: 4,
            }, {
                pattern: /^[a-z ,.'-]+$/i,
                msg: 'Please enter valid name. Allowed symbols: a-z ,.\'-'
            }],

            lastName: [{
                maxLength: 20,
            }, {
                minLength: 4,
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
        }
    });
})(CS.User);