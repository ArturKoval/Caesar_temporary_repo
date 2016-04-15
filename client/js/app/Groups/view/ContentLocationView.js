(function (This) {
    This.ContentLocationView = Backbone.View.extend({
		tagName: 'div',
    	className: 'contentLocation',
    	initialize: function () {
    		app.mediator.subscribe('Locations: show-groups-in-location', this.render.bind(this));
    	},
	    render: function (locations) {
	    	var numberOfLocations;
	    	
	    	if (this.model) {
	    		this.$el.html(templates.contentLocationTpl(this.model.toJSON()));
	    	} else {
	    		if (!locations){
	    			this.$el.html(templates.contentLocationTpl({location: app.user.get('location')}));
	    		} else {
	    			if (locations.length > 1) {
	    				numberOfLocations = locations.length + ' ' + 'locations';
	    				this.$el.html(templates.contentLocationTpl({location: numberOfLocations}));
			    	} else {
			    		this.$el.html(templates.contentLocationTpl({location: locations}));
			    	}
	    		}
	    	}
	    	
	    	return this;
	    },

	    showSelectedLocationName: function (locations) {
	    	if (this.model) {
		    	this.$el.html(templates.contentLocationTpl(this.model.toJSON()));
		    	this.$el.attr({
		    		'title': locations
		    	});
	    	}
	    	
	    	return this;
	    }
	});

})(CS.Groups);