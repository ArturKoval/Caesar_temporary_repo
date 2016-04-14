(function (This) {
    This.ContentLocationView = Backbone.View.extend({
		tagName: 'div',
    	className: 'contentLocation',
	    render: function () {
	    	this.$el.html(templates.contentLocationTpl(this.model.toJSON()));
	    	
	    	return this;
	    },

	    showSelectedLocationName: function (locations) {
	    	this.$el.html(templates.contentLocationTpl(this.model.toJSON()));
	    	this.$el.attr({
	    		'title': locations
	    	});
	    	
	    	return this;
	    }
	});

})(CS.Groups);