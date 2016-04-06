'use strict';

(function (This) {

    This.PreloadView = Backbone.View.extend({
    	el: '#modal-window',
    	template: templates.preloadView,
        
	    initialize: function () {
	    },

	    render: function () {
	    	this.$el.addClass('modal-window');
	    	this.$el.append(templates.preloadView());
	    	
	    	return this;
	    },  
    });
})(app);