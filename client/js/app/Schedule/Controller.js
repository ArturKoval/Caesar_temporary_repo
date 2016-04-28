'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({

        initialize: function () {
            this.mediator = app.mediator;
            this.$content = $('#content-section'); 
            this.$main = $('.main-section')            
            this.contentView = new CS.Groups.ContentView();
            this.$content.html(this.contentView.render().$el);
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
        
    });
})(CS.Schedule, app);