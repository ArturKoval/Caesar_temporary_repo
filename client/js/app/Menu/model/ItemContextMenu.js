'use strict';

(function (This) {
    This.ItemContextMenu = Backbone.Model.extend({
        defaults: function () {
            return {
                icon: '',
                description: '',
                rules: {},
                isVisible: true
            };
        }
    });
})(CS.Menu);

