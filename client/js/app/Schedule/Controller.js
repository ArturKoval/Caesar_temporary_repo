'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({

        subscribes: {
            'Menu: changed-page': 'deleteView',
            'Locations: selected': 'groupsRender'
        },

        initialize: function () {
            this.mediator = app.mediator;
            this.$content = $('#content-section');  
            this.$sidebar = $('#left-side-bar');
            this.scheduleView = new This.ScheduleView();
        },

        start: function (locations) {        
            this.trigger = true;
            this.contentView = new CS.Groups.ContentView();
            this.groupListView = new CS.Groups.GroupListView({
                collection: store.groups
            });

            this.$content.html(this.contentView.render().$el);              
            this.$sidebar.html(this.groupListView.render().el);              
            this.$main = $('.main-section');                         
            app.mediator.publish('Locations: selected', locations);                  
            this.render();
            $('#left-menu').css('display','block');
        },

        render: function () {
            $('.main-section').html(this.scheduleView.render().el);
        },

        groupsRender: function() {
            if (this.trigger) {
                this.groupListView.renderGroups();
                this.groupListView.render().el;
            }
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