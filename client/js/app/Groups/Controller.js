'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'Groups: edit-request': 'showForm',
            'Groups: delete-request': 'delete',
            'Groups: create-request': 'showForm',
            'Locations: selected': 'render',
            'Groups: selected': 'showSelectedGroup',
            'Groups: saved': 'showSelectedGroup',
            'GroupList paginator: page-selected': 'groupsRender',
            'Menu: changed-page': 'deleteView'
        },

        initialize: function () {
            this.mediator = app.mediator;

            this.trigger = true;

            this.$sidebar = $('.left-side-bar');
            this.$content = $('.content-section');
            this.$main = $('.main-section');
        },

        start: function (locations) {
            this.trigger = true;
            app.mediator.publish('Locations: selected', locations);
            $('#left-menu').css('display', 'block');
        },

        render: function () {
            this.contentView = new This.ContentView();
            this.$content.html(this.contentView.render().el);

            if (this.groupListView) {
                this.groupListView.remove();
                this.groupListView.paginatorView.remove();
            }
            this.groupListView = new This.GroupListView({
                collection: store.groups
            });

            this.$sidebar.html(this.groupListView.render().el);
        },

        groupsRender: function () {
            if (this.trigger) {
                this.groupListView.renderGroups();
            }
        },

        scheduleGroupsViewRender: function () {
            if (this.groupListView) {
                this.groupListView.remove();
                this.groupListView.paginatorView.remove();
            }
            this.groupListView = new This.ScheduleGroupListView({
                collection: store.groups
            });

            this.$sidebar.html(this.groupListView.render().el);
        },

        showLocationByRoute: function (arrLocations) {
            this.render();
            if (isLocation(arrLocations)) {
                app.mediator.publish('Error: show-error-page', {
                    elem: this.$main,
                    message: 'such a location is not found'
                });

                return false;
            } else {
                app.mediator.publish('Locations: selected', arrLocations);

                return true;
            }

            function isLocation(locations) {
                var arr = [];

                locations.forEach(function (location) {
                    if (store.locations.getNames().indexOf(location) < 0) {
                        arr.push(location);
                    }
                });

                return arr.length;
            }
        },

        showGroupViewByRoute: function (locations, groupName, action) {
            if (this.showLocationByRoute(locations)) {
                if (store.groups.findGroupByName(groupName)) {
                    this.showSelectedGroup(this.list(locations).findGroupByName(groupName), action);
                } else {
                    app.mediator.publish('Error: show-error-page', {
                        elem: this.$main,
                        message: 'such a group is not found'
                    });
                }
            }

            return store.groups.findGroupByName(groupName);
        },

        showForm: function (group) {
            var createEditView = new This.CreateEditView(group);

            this.modal(createEditView);
        },

        delete: function (group) {
            var groupDeleteView = new This.GroupDeleteView({
                model: group
            });

            this.modal(groupDeleteView);
        },

        showSelectedGroup: function (selected, action) {
            var groupView = new This.GroupView({
                model: selected
            });

            $('.main-section').html(groupView.render().el);
            groupView.showStubView(action);
        },

        deleteView: function () {
            if (this.trigger) {
                this.trigger = false;
                this.contentView.remove();
                this.groupListView.remove();
                this.groupListView.paginatorView.remove();
            }
        },

        //Helpers

        modal: function (view) {
            $('#modal-window').html(view.render().el);
        },

        list: function (data) {
            return store.groups.findGroupsByLocations(data);
        }
    });
})(CS.Groups, app);