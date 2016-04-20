'use strict';

(function (This, app) {
    This.LocationListView = Backbone.View.extend({
        tagName: 'div',
        className: 'locationsWindow',
        template:templates.locationTpl,
        events: {
            'click .cancel':'close',
            'click .save':'showGroupsInLocation',
            'dblclick':'showGroupsInLocation',
        },
        
        initialize: function () {
            this.locations = [];
            app.mediator.subscribe('Locations: select-locations', this.chooseLocations.bind(this));
        },

        render: function () {
            var collection, 
                locationView;

            this.$el.html(this.template);
            collection = this.collection.sort();

            _.each(collection, function (location) {
                locationView = new This.LocationView();
                this.$el.find('.locations').prepend(locationView.$el.append(location));
            }, this); 
			
            $(document).on('keydown', keyEvent.bind(this));

            function keyEvent (event) {
                if (event.which === System.constants.ENTER) {
                    this.showGroupsInLocation();
                } else if (event.which === System.constants.ESC) {
                    this.close();
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

            function isLocationChosen (location) {
                return location !== selectedLocations;
            }
         },

        showGroupsInLocation: function () {
            app.mediator.publish('Locations: selected', this.locations.slice());
            this.locations.splice(0);
            this.close();
        },

        close: function () {
            this.$el.remove();
        }
    });

})(CS.Locations, app);