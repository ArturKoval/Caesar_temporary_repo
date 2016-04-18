(function (This) {
    This.ContentLocationView = Backbone.View.extend({
        tagName: 'div',
        className: 'contentLocation',
    
        initialize: function () {
            app.mediator.subscribe('Locations: show-groups-in-location', this.render.bind(this));
        },

        render: function (locations) {
            if (locations) {
                this.showLocations(locations);
            } else if (this.model) {
                this.$el.html(templates.contentLocationTpl(this.model.toJSON()));
            } else {
                this.$el.html(templates.contentLocationTpl({location: app.user.get('location')}));
            }

        return this;
    },

        showLocations: function (locations) {
            var numberOfLocations;

            if (locations.length > 1) {
                numberOfLocations = locations.length + ' ' + 'locations';
                this.$el.html(templates.contentLocationTpl({location: numberOfLocations}));
                this.$el.attr({
                    'title': locations
                });
            } else {
                this.$el.html(templates.contentLocationTpl({location: locations}));
            }
        }
    });

})(CS.Groups);