'use strict';

(function (This) {
    This.ContentView = Backbone.View.extend({
    	el: '#content-section',

	    render: function () {
	    	var contentHeaderView = new This.ContentHeaderView({model: this.model})
	    		.render();
	    		this.$el.find('.content-header').html(contentHeaderView.el);
	    	var contentFooterView = new This.ContentFooterView({model: this.model})
	    		.render();
	    		this.$el.find('.content-footer').html(contentFooterView.el);
	    	
	    	return this;
	    }   
    });

})(CS.Groups);