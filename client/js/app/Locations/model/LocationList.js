'use strict';

(function (This) {
    This.LocationList = Backbone.Collection.extend({
        model: This.Location,
        
        getByName: function (name) {
           var res;
           
           this.forEach(function (location) {
                if (location.get('city') === name) {
                    res = location;
                }
           });
            
           return res; 
        },
        
        getNames: function () {
            var names = [];
            
            this.forEach(function (location) {
                names.push(location.get('city')); 
            });
            
            return names;
        },
		
		comparator: function (model) {
			return model.get('city');
		}
    });
})(CS.Locations);