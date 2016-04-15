(function (This) {
    This.ContentFooterView = Backbone.View.extend({

	    render: function () {
	    	this.$el.empty();
	    	this.$el.html(templates.contentFooterTpl(this.model.toJSON()));
	    	
	    	return this;
	    },	    
    });

})(CS.Groups);