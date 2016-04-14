'use strict';

(function (This) {
    This.LocationView = Backbone.View.extend({
        tagName: 'div',
        className: 'location',
        events: {
            'click': 'onSelectLocation',
        },

        render: function () {

            return this;
        },

        onSelectLocation: function () {
            this.$el.toggleClass('active-location');
            var selectedLocations = this.$el.html();
            app.mediator.publish('Locations: select-locations', selectedLocations);
        }
    });

})(CS.Locations);