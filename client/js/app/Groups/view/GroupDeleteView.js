'use strict';

(function (This) {
    This.GroupDeleteView = Backbone.View.extend({
    	tagName: 'div',
    	className: 'groupView',
        template: templates.groupDeleteViewTpl,
        events: {
            'click .btn-delete': 'deleteGroup',
            'click .btn-cancel': 'cancel'
        },

        render: function () {
        	this.$el.append(this.template(this.model.toJSON()));
        	
            return this;
        },

        deleteGroup: function () {
            this.remove();
            this.model.destroy();
        },

        cancel: function () {
            this.remove();
        }
    });
})(CS.Groups);