'use strict';

(function (This) {
    This.LocationView = Backbone.View.extend({
    	tagName: 'div',

    	className: 'location',

        events: {
            'click': 'onSelectLocation',
        },

        initialize: function () {  
        },

        render: function () {
            this.$el.append(this.model);
        	return this;
        },

        onSelectLocation: function () {
            this.$el.toggleClass('active-location');
        }
    });

})(i.locations);