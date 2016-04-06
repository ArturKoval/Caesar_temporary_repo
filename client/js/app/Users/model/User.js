'use strict';

(function (This) {
    This.User = Backbone.Model.extend({
        urlRoot: '/users',
        defaults: {
            firstName: 'John',
            lastName: 'Hankock',
            location: 'Unknown',
            role: 'ITA Teacher',
            photo: '/img/default-photo.png'
        },
        
        validation: {
            name: [{
                maxLength: 40,
                msg: 'Max length is 40 symbols.'
            }, {
                minLength: 4,
                msg: 'Min length is 4 symbols.'
            }, {
                required: true,
                msg: 'Field cannot be empty'
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
            return this.get('lastName') + ' ' + this.get('firstName');
        },

        getShortName: function () {
            return  this.get('lastName') + ' ' + this.get('firstName').charAt(0) + '.';
        }
    });
})(CS.User);