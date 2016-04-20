'use strict';

(function (This, app) {
    This.LocationListView = Backbone.View.extend({
        tagName: 'div',
        className: 'locationsWindow',
        $documentEl: $(document),
        
        template: templates.locationTpl,
        
        events: {
            'click .save': 'select',
            'click .cancel': 'close'
        },
        
        initialize: function () {
            this.checkedLocations = [];
            app.mediator.subscribe('Locations: checked', this.updateCheckedLocations, {}, this);
            app.mediator.subscribe('Locations: one-selected', this.selectOne, {}, this);
            _.bindAll(this, 'onKeyPress');
            this.$documentEl.bind('keydown', this.onKeyPress);
        },

        render: function () {
            var collection;
            
            this.$el.html(this.template);
            collection = this.collection.sort();

            _.each(collection, function (location) {
                var locationView = new This.LocationView({
                    model: location
                });
                
                this.$el.find('.location-buttons').before(locationView.$el.append(location));
            }, this); 
			
            return this;
        },

        onKeyPress: function (e) {
            if (e.keyCode === System.constants.ENTER) {
                this.select();
            } else if (e.keyCode === System.constants.ESC) {
                this.close();
            }
        },
        
        updateCheckedLocations: function (checkedLocation) {   
            if (_.contains(this.checkedLocations, checkedLocation)) {
                this.checkedLocations = this.checkedLocations.filter(isLocationChecked);
            } else {
                this.checkedLocations.push(checkedLocation);
            }  
           
            function isLocationChecked (location) {
                return location !== checkedLocation;
            }
        },

        select: function () {
            app.mediator.publish('Locations: selected', this.checkedLocations.slice());
            this.close();
        },
        
        selectOne: function (selectedLocation) {
            this.checkedLocations = [selectedLocation];
            this.select();
        },

        close: function () {
            app.mediator.remove('Locations: checked', this.updateCheckedLocations, {}, this);
            app.mediator.remove('Locations: one-selected', this.selectOne, {}, this);
            
            this.$documentEl.unbind('keydown', this.onKeyPress);
            this.remove();
        }
    });
})(CS.Locations, app);