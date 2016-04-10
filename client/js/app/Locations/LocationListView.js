'use strict';

(function (This, app) {
    This.LocationListView = Backbone.View.extend({
        tagName: 'div',
        className: 'locationsWindow',
        events: {
            'click .cancel':'removeModal',
            'click .save':'showGroupsInLocation',
            'dblclick':'showGroupsInLocation',
        },

        initialize: function () {
            this.locations = [];
            app.mediator.subscribe('Locations: select locations', this.chooseLocations.bind(this));
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

        chooseLocations: function (selectedLocations) {   
            if (!(_.contains(this.locations, selectedLocations))) {
                this.locations.push(selectedLocations); 
            } else {
                this.locations = this.locations.filter(isLocationChosen);
            }  

            function isLocationChosen (location , i) {
                return location !== selectedLocations;
            }
         },

        showGroupsInLocation: function () {
            app.mediator.publish('Locations: showGroupsInLocation', this.locations);
            this.locations.splice(0);
            this.$el.remove();
        },

        removeModal: function () {
            this.$el.remove();
        },

    });

})(CS.Locations, app);