'use strict';

(function (This, app) {
    This.LocationListView = Backbone.View.extend({
        tagName: 'div',
        className: 'locationsWindow',
        locations: [],

        events: {
            'click .cancel':'removeModal',
            'click .save':'showGroupsInLocation',
            'dblclick':'showGroupsInLocation',
        },

        initialize: function () {
            $('#modal-window').addClass('modal-window');
            this.collection = This;
            app.mediator.subscribe('Locations: select locations', function (selectedLocations) { 
                if (!(_.contains(this.locations, selectedLocations))) {
                    this.locations.push(selectedLocations); 
                } else {
                    _.each(this.locations, function (location, i) {
                        if (location === selectedLocations) {
                            this.locations.splice(i, 1)
                        }
                    }.bind(this));
                }
            }.bind(this));
        },

        render: function () {
            var $wrapper = $('<div><div>').addClass('wrapper-location');
            _.each(this.collection, function (location) { 
                var locationView = new This.LocationView();

                $wrapper.append(locationView.$el.append(location));
            }, this); 

            this.$el.append($wrapper.append(templates.locationTpl));  

            $(document).on('keydown', keyEvent.bind(this));
            function keyEvent (event) {
                if (event.which === ENTER) {
                    this.showGroupsInLocation();
                } else if (event.which === ESC) {
                    this.removeModal();
                }
        }
 
            return this;
        },

        showGroupsInLocation: function () {
            app.mediator.publish('Locations: showGroupsInLocation', this.locations);
            this.$el.remove();
            $('#modal-window').removeClass('modal-window');
            this.locations.splice(0);
        },

        removeModal: function () {
            this.$el.remove();
            $('#modal-window').removeClass('modal-window');
        }
    });

})(i.locations, app);