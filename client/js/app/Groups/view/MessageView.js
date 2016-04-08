'use strict';

(function (This) {
    This.MessageView = Backbone.View.extend({
        tagName: 'div',
        className: 'message_view',

        render: function() {
            this.$el.html('<span>You have no messages...</span>');
            
            return this;
        }
    });
})(CS.Groups);