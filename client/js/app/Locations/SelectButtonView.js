var SelectButtonView = Backbone.View.extend({
	tagName: 'button',
	className: 'myGroups btn btn-primary',
    events: {
        'click': 'onSelectLocation',
    },

    render: function () {
    	return this;
    },

    onSelectLocation: function () {
        app.mediator.publish('Locations: showLocationsView');
    }
});

