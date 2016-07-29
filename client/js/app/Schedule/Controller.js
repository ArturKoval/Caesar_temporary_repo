'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({

        subscribes: {
            'Menu: changed-page': 'deleteView',
            //'Menu: Schedule': 'start',
            'Locations: selected': 'groupsRender'
        },

        initialize: function () {
            this.mediator = app.mediator;
            this.$content = $('#content-section');
            this.$sidebar = $('#left-side-bar');
            this.scheduleView = new This.ScheduleView();
        },

        start: function (locations) {
            // var locations = app.locationsController.getSelectedLocations();
            this.contentView = new CS.Groups.ContentView();
            this.groupListView = new CS.Groups.GroupListView({
                collection: store.groups
            });
            this.$sidebar.html(this.groupListView.render().el);
            this.$content.html(this.contentView.render().$el);

            //app.mediator.publish('Locations: selected', locations);
            //this.groupListView.renderGroups();
            this.render();
            $('#left-menu').css('display','block');
            console.log(this.trigger);
            this.trigger = true;
        },

        render: function () {
            this.$main = $('.main-section');
            this.$main.html(this.scheduleView.render().el);
        },

        groupsRender: function() {
            if (this.trigger) {
                this.groupListView.renderGroups();
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
