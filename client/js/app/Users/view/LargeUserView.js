'use strict';

(function (This, app) {
    This.LargeUserView = Backbone.View.extend({
	    template: templates.largeUserViewTpl,
		
	    events: {
	        'click .btn-edit': 'showEditDialog',
	        'click .btn-logout': 'logout',
	        'mouseleave': 'hide'
	    },

	    initialize: function () {
	        this.listenTo(this.model, 'change', this.render);
	    },

	    render: function () {
	    	this.$el.empty();
	        this.$el.html(this.template(this.model.toJSON()));

	        return this;
	    },

	    showEditDialog: function () {
	        app.mediator.publish('User: edit-dialog-called', this.model);
	    },

	    logout: function () {
	        app.mediator.publish('User: logged-out', this.model);
	    }, 
	    
	    show: function () {
	    	this.$el.addClass('open');
	    },

	    hide: function () {
	    	this.$el.removeClass('open');
	    }
    });
})(CS.User, app);