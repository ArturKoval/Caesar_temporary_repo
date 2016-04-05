'use strict';

(function (This, app) {
    This.LargeUserView = Backbone.View.extend({
        tagName: 'div',
        className: 'profile-container',
	    template: templates.largeUserViewTpl,
	    $documentEl: $(document),
	    events: {
	    	'click': 'onElementClick',
	        'click .btn-edit': 'showEditDialog',
	        'click .btn-logout': 'logout'
	    },

	    initialize: function () {
	        this.listenTo(this.model, 'change', this.render);
	    },

	    render: function () {
	        this.$el.html(this.template(this.model.toJSON()));
	        this.$documentEl.bind('click', this.onGlobalClick);

	        return this;
	    },

	    showEditDialog: function () {
	        app.mediator.publish('User: EditDialogCalled', this.model);
	    },

	    logout: function () {
	        app.mediator.publish('User: LoggedOut', this.model);
	        this.hide();
	    }, 

	    hide: function (e) {
	    	this.$documentEl.unbind('click', this.onGlobalClick);
	    	this.remove();
	    },

	    onElementClick: function (e) {
	    	e.stopPropagation();
	    },

	    onGlobalClick: function (e) {
	    	this.hide();
	    }
    });
})(CS.User, app);