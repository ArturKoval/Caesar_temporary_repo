'use strict';

(function (This) {
    This.ContentGroupNameView = Backbone.View.extend({
    	tagName: 'div',
    	className: 'contentGroupName',

	    render: function () {
	    	this.$el.html(templates.contentGroupNameTpl(this.model.toJSON()));
	    	
	    	return this;
	    },	    
    });

})(CS.Groups);