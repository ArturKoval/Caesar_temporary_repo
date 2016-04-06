'use strict';

(function (This) {
    This.LocationListView = Backbone.View.extend({
    	tagName: 'div',
    	className: 'locationsWindow',

        events: {
            'click .submit':'removeModal'
        },

        initialize: function () {
            $('#modal-window').addClass('modal-window');
        	this.collection = This;
        },

        render: function () {
            var $wrapper = $('<div><div>').addClass('wrapper-location');
            _.each(this.collection, function (location, i) { 
                var locationView = new This.LocationView();
                $wrapper.append(locationView.$el.append(location));
            }, this); 

            this.$el.append($wrapper.append(templates.locationTpl));   
        	return this;
        },

        removeModal: function () {
            this.$el.remove();
            $('#modal-window').removeClass('modal-window');
        }
    });

})(i.locations);