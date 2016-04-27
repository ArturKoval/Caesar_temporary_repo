'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        // subscribes: {
        //     'Locations: selected' : 'showMonth'
        // },

        initialize: function () {
            this.mediator = app.mediator;
        },

        render: function () {

        },

        showMonth: function () {
            var monthView = new This.MonthView();
            $('#main-section').html(monthView.render(new Date().getFullYear(), new Date().getMonth()).el);
        }
        
    });
})(CS.Schedule, app);