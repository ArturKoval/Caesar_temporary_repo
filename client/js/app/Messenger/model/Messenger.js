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
    });
})(CS.Messenger);