'use strict';

(function (This) {
    This.ItemMenu = Backbone.Model.extend({
        defaults: function () {
            return {
                icon: '',
                description: ''
            };
        }
    });
})(CS.Menu);
