'use strict';


(function (This, app) {
    This.Controller = Backbone.Controller.extend({

        subscribes: {
            'Locations schedule: selected': 'render',
            'Schedule: the only selected': 'renderScheduale',
            'Menu: changed-page': 'deleteView'
        },

        initialize: function () {
            this.mediator = app.mediator;

            this.$content = $('#content-section');  
            this.$sidebar = $('#left-side-bar');
            this.$main = $('.main-section');                         
        },

        start: function (locations) {         
            app.mediator.publish('Locations schedule: selected', locations);
        },

        render: function () {
            this.deleteView();

            this.contentView = new This.ContentView();

            this.groupListView = new This.GroupListView({
                collection: store.groups
            });

            this.$sidebar.html(this.groupListView.render().el);
            this.$content.html(this.contentView.render().el);
        },

        renderScheduale: function (model) {
            this.scheduleView = new This.ScheduleView();
            
            $('.main-section').html(this.scheduleView.render().el);
        },

        deleteView: function () {
            if (this.contentView) {
                this.contentView.remove();
            }

            if (this.groupListView) {
                this.groupListView.remove();
            }
        }        
    });
})(CS.Schedule, app);

