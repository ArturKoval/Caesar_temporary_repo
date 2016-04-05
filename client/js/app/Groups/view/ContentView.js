'use strict';

(function (This) {
    This.ContentView = Backbone.View.extend({
         initialize: function () {
	    },

	    renderHeader: function () {
	    	this.$el = $('#content-header'),
	    	this.$el.html(templates.contentHeaderTpl(this.model.toJSON()));
	    	
	    	return this;
	    },

	    renderFooter: function () {
	    	this.$el = $('#content-footer'),
	    	this.$el.html(templates.contentFooterTpl(this.model.toJSON()));
	    	return this;
	    }
	    
    });

})(CS.Groups);