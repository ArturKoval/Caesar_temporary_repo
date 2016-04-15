'use strict';

(function (This) {
    This.Messenger = Backbone.Model.extend({
        defaults: function () {
            return {
                type: '',
                text: '',
                object: '',
                callback: '',
                $el: ''
            };
        },

        initialize: function () {
        },

        defineMessage: function (data) {
             this.set('text', data.message);
        }
    });
})(CS.Messenger);