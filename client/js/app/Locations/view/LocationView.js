'use strict';

(function (This, app) {
    This.LocationView = Backbone.View.extend({
        tagName: 'li',
        className: 'location',

        template: templates.locationViewTpl,

        events: {
            'click p': 'toggleCheck',
            'dblclick p': 'select'
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },

        toggleCheck: function () {
            this.$el.toggleClass('active-location');
            this.model.toggleCheck();
        },

        select: function () {
            app.mediator.publish('Locations: one-selected', this.model);
        }
    });
})(CS.Locations, app);