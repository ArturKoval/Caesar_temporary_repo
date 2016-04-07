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
	        app.mediator.publish('User: EditDialogCalled', this.model);
	    },

	    logout: function () {
	        app.mediator.publish('User: LoggedOut', this.model);
	    }, 
	    
	    show: function () {
	    	this.$el.addClass('open');
	    },

	    hide: function (e) {
	    	this.$el.removeClass('open');
	    }
    });
})(CS.User, app);