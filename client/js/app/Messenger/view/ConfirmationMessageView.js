'use strict';

(function (This, app) {
    This.ConfirmationView = Backbone.View.extend({
        tagName: 'div',
        className: 'modal-wrapper',
	    template: templates.confirmationTpl,
	    events: {
	        'click .okBtn': 'confirmate',
	        'click .cancelBtn': 'cancel'
	    },

	    initialize: function () {
	        this.listenTo(this.model, 'change', this.render);
	    },

	    render: function () {
	        this.$el.html(this.template(this.model.toJSON()));
	        return this;
	    },

	    confirmate: function () {
	        //
	        this.remove();
	    },

	    cancel: function () {
	    	this.remove();
	    }
    });
})(CS.Messenger, app);