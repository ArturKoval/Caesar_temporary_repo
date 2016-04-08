'use strict';

(function (This) {
    This.ContentHeaderView = Backbone.View.extend({

	    render: function () {
	    	this.$el.html(templates.contentHeaderTpl(this.model.toJSON()));
	    	
	    	return this;
	    },	    
    });

})(CS.Groups);