'use strict';

(function (This, app) {
    This.FlashMessageView = Backbone.View.extend({
        tagName: 'div',
        className: 'flash-style',
	    templateInfo: templates.flashInfoTpl,
	    templateWarning: templates.flashWarningTpl,

	    events: {
	         'click .close': 'remove'
	    },

	    initialize: function () {
	    	this.render();
	     	setTimeout(this.removeFlash.bind(this), 4000);
	     	this.model.on('destroy', this.fadeOutElement.bind(this));
	     	this.removeMessage();

	    },

	    render: function () {
	    	if (this.model.get('type') === 'flash-info') {
	    		this.$el.html(this.templateInfo(this.model.toJSON()));
	    		this.$el.addClass('styleInfo');
	    	} else if (this.model.get('type') === 'flash-warning') {
	    		this.$el.html(this.templateWarning(this.model.toJSON()));
	    		this.$el.addClass('styleWarning');
	    	}
	       
	        return this;
	    },

	    removeFlash: function () {
			this.model.destroy();
	    },

	    fadeOutElement: function () {
			this.$el.fadeOut();
	    	setTimeout(this.removeMessage.bind(this), 1000);	
	    },

	    removeMessage: function () {
	        this.$el.remove();
	    }
    });
    
})(CS.Messenger, app);