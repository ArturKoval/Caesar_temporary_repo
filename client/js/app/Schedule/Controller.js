'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({

        subscribes: {
            'Menu: changed-page': 'deleteView'
        },

        initialize: function () {
            this.mediator = app.mediator;
            this.$content = $('#content-section');  
            this.$sidebar = $('#left-side-bar');         
            this.contentView = new CS.Groups.ContentView();
            this.scheduleView = new This.ScheduleView();
        },

        start: function (locations) {
            this.groupListView = new CS.Groups.GroupListView({
                collection: store.groups
            });
            this.$content.html(this.contentView.render().$el);  
            this.$sidebar.html(this.groupListView.render().el);
            this.$main = $('.main-section');
            app.mediator.publish('Locations: selected', locations);
            this.groupListView.renderGroups();
            this.render();
            this.trigger = true;
        },

        render: function () { 
            this.$main.html(this.scheduleView.render().el); 
        },

        deleteView: function () {
            if (this.trigger) {
                this.trigger = false;
                this.contentView.remove();
                this.groupListView.remove();
            }
        }
        
    });
})(CS.Schedule, app);