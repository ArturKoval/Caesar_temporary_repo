'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            //'Locations: selected' : 'showMonth',
            /* 'Menu: Schedule' : 'render' */
        },

        initialize: function () {
            this.mediator = app.mediator;
            
            this.$leftMenu = $('.left-menu');
            
            this.$sidebar = $('#left-side-bar');
            this.$content = $('#content-section');
                       
            this.contentView = new CS.Groups.ContentView();
            this.$content.html(this.contentView.render().$el);
            this.$main = $('.main-section');
        },

        start: function () {
            var userLocation = app.user.get('location');

            app.mediator.publish('Locations: selected', [userLocation]);

            this.render();
            
            return userLocation;
        },

        render: function () {
            var scheduleView = new This.ScheduleView();

            $('.main-section').html(scheduleView.render().el); 
        },

/*         showMonth: function () {
            var monthView = new This.MonthView();
            $('#main-section').html(monthView.render(new Date().getFullYear(), new Date().getMonth()).el);
        } */
        
    });
})(CS.Schedule, app);