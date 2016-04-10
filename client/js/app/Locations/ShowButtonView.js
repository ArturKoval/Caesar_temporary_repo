var SelectButtonView = Backbone.View.extend({
	tagName: 'button',
	className: 'btn btn-primary',
    events: {
        'click': 'onSelectLocation',
    },

    render: function () {
    	return this;
    },

    onSelectLocation: function () {
        app.mediator.publish('Locations: Show-button selected');
    }
});

