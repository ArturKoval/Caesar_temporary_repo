'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            //'Locations: selected' : 'showMonth',
            
        },

        initialize: function () {
            this.mediator = app.mediator;
            
            this.$leftMenu = $('.left-menu');
            
            this.$sidebar = $('#left-side-bar');
            this.$content = $('#content-section');
                       
            this.contentView = new CS.Groups.ContentView();
            this.$content.html(this.contentView.render().$el);
            this.$main =  $('.main-section');
        },

        start: function () {
            var userLocation = app.user.get('location');
            this.groupListView = new CS.Groups.GroupListView({
                collection: store.groups
            });

            $('#left-side-bar').html(this.groupListView.render().el);

            app.mediator.publish('Locations: selected', [userLocation]);
            

            // app.mediator.publish('Locations: selected', [userLocation]);
            
            return userLocation;
        },

        render: function () {
            
        },

        showMonth: function () {
            var monthView = new This.MonthView();
            $('#main-section').html(monthView.render(new Date().getFullYear(), new Date().getMonth()).el);
        }
        
    });
})(CS.Schedule, app);