'use strict';

(function (This, app) {
    This.LocationView = Backbone.View.extend({
        tagName: 'div',
        className: 'location',
        events: {
            'click': 'check',
            'dblclick':'select'
        },

        render: function () {
            this.$el.html(this.model);
            
            return this;
        },

        check: function () {
            this.$el.toggleClass('active-location');
            app.mediator.publish('Locations: checked', this.model);
        },
        
        select: function () {
            app.mediator.publish('Locations: one-selected', this.model);
        }
    });
})(CS.Locations, app);