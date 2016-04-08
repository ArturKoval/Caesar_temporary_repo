'use strict';

(function (This) {
    This.GroupDeleteView = Backbone.View.extend({
    	tagName: 'div',
    	className: 'modal-wrapper',
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
            this.model.destroy();
            this.close();
        },

        cancel: function () {
            this.close();
        },

        close: function () {
            app.mediator.publish('Groups: DeleteDialogClosed');
            this.remove();
        }
    });
})(CS.Groups);