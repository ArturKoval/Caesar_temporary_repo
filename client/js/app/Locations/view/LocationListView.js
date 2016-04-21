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
            
            this.$el.html(this.template);
            this.$saveBtnEl = this.$el.find('.save');
			
			this.collection.sort();
            
            this.collection.forEach(function (location) {
                var locationView = new This.LocationView({
                    model: location
                });
                
                this.$el.find('.locations').append(locationView.render().el);
            }.bind(this));
			
            return this;
        },

        onKeyPress: function (e) {
            if (e.keyCode === System.constants.ENTER) {
                if (this.checkedLocations.length > 0) {
                   this.select(); 
                }
            } else if (e.keyCode === System.constants.ESC) {
                this.close();
            }
        },
        
        updateCheckedLocations: function (checkedLocation) {   
            if (_.contains(this.checkedLocations, checkedLocation.get('city'))) {
                this.checkedLocations = this.checkedLocations.filter(isLocationChecked);
            } else {
                this.checkedLocations.push(checkedLocation.get('city'));
            }
            
            if (this.checkedLocations.length > 0) {
                this.$saveBtnEl.prop('disabled', false);
                this.$saveBtnEl.removeClass('disabled');
            } else {
                this.$saveBtnEl.prop('disabled', true);
                this.$saveBtnEl.addClass('disabled');
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
            this.checkedLocations = [selectedLocation.get('city')];
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