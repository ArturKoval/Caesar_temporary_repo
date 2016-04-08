'use strict';

(function (This) {
    This.GroupDeleteView = Backbone.View.extend({
    	tagName: 'div',
    	className: 'modal-wrapper',
        template: templates.groupDeleteViewTpl,
        documentEl: $(document),
        events: {
            'click .btn-delete': 'deleteGroup',
            'click .btn-cancel': 'close'
        },

        initialize: function () {
            _.bindAll(this, 'onKeyPress');
            this.documentEl.bind('keydown', this.onKeyPress);
        },

        render: function () {
        	this.$el.append(this.template(this.model.toJSON()));
        	
            return this;
        },

        deleteGroup: function () {
            this.model.destroy();
            this.close();
        },

        close: function () {
            app.mediator.publish('Groups: DeleteDialogClosed');
            this.documentEl.unbind('keydown', this.onKeyPress);
            this.remove();
        },

        onKeyPress: function (e) {
            if (e.keyCode === ESC) {
                this.close();
            }

            if (e.keyCode === ENTER) {
                this.deleteGroup();
            }
        }
    });
})(CS.Groups);