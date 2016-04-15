'use strict';

(function (This, app) {
    This.ContentView = Backbone.View.extend({
    	el: '#content-section',
    	
    	initialize: function () {
    		this.model.on('change', this.render, this);
    		app.mediator.subscribe('Locations: show-groups-in-location', this.showContentHeader.bind(this));
    	},

	    render: function () {
	    	var contentLocationView,
	    	contentGroupNameView,
	    	contentFooterView;


	    	contentLocationView = new This.ContentLocationView({
	    		model: this.model
	    	});

	    	contentGroupNameView = new This.ContentGroupNameView({
	    		model: this.model
	    	});

	    	this.$el.find('.content-header-location').html(contentLocationView.render().el);
	    	this.$el.find('.content-header-group-name').html(contentGroupNameView.render().el);

	    	contentFooterView = new This.ContentFooterView({
	    		model: this.model
	    	});

	    	this.$el.find('.content-footer').empty();
	    	this.$el.find('.content-footer').append(contentFooterView.render().el);
	    	
	    	return this;
	    },

	    showContentHeader: function (locations) {
	    	var numberOfLocations, contentLocationView;
	    	numberOfLocations = locations.length + ' ' + 'locations';

	    	if (locations.length > 1) {
	    		this.model.set('location', numberOfLocations);
	    	} else {
	    		this.model.set('location', locations)
	    	}
	    	
	    	contentLocationView = new This.ContentLocationView({
	    		model: this.model
	    	});

	    	contentLocationView.showSelectedLocationName(locations);

	    	this.$el.find('.content-header-location').html(contentLocationView.el);
	    	this.$el.find('.content-header-group-name').empty();
	    	this.$el.find('.content-footer').empty();
	    }
    });

})(CS.Groups, app);