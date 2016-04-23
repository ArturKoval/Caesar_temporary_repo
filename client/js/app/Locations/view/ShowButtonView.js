var SelectButtonView = Backbone.View.extend({
    tagName: 'button',
    className: 'btn btn-primary',

    events: {
        'click': 'onSelectLocation'
    },

    render: function () {
        return this;
    },

    onSelectLocation: function () {
        this.$el.blur();

        app.mediator.publish('Locations: show-request');
    }
});

