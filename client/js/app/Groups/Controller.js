'use strict';

(function (This) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'Groups: group selected': 'showSelectedGroup',
            'Groups: Edit button selected': 'createEdit',
            'Locations: Show-button selected': 'showAllLocations',
            'Locations: showGroupsInLocation': 'render',
            'Groups: DeleteDialogCalled': 'delete',
            'Groups: group-saved': 'showSelectedGroup',
            'Groups: Show 404': 'show404'
        },

        initialize: function () {
            this.mediator = app.mediator;
			$('#createGroup').on('click', function () {
                var editCreateView = new This.CreateEditView();
                this.$modal(editCreateView);
            });
            this.$modal = function (view) {
                $('#modal-window').append(view.render().$el);
            };
            this.$main = $('.main-section');
            this.$showAllbutton = function () {
                $('#page').prepend(new SelectButtonView().render().$el.html('Show all locations'));
            };
            this.list = function (data) {
                return new This.GroupList(store.groups).findGroupsByLocations(data)
            };
        },

        start: function () {
            this.render([app.user.location])
            this.$showAllbutton();

            return app.user.location;
        },

        render: function (data) {
            var groupListView = new This.GroupListView({
                collection: this.list(data)
            }),
                $sidebar = $('#left-side-bar');

            $sidebar.empty();
            $sidebar.append(groupListView.$el).append(groupListView.render());

            this.$main.empty();            

        },

        showPageByRoute: function (location, groupName) {
            this.render(location);
            this.$showAllbutton();
            this.showSelectedGroup(this.list(location).findGroupByName(groupName));
            return this.list(location).findGroupByName(groupName);
        },

		showLocationByRoute: function (location) {
            this.render(location);
            this.$showAllbutton();
		},

        showViewByRoute: function (location, groupName, action) {
            this.render(location);
            this.$showAllbutton();
            this.showSelectedGroup(this.list(location).findGroupByName(groupName), action);
        },

        showSelectedGroup: function (selected, action) {
            var contentView = new This.ContentView({
                model: selected
            });
            
            contentView.render();
            this.$main.empty();
            var groupView = new This.GroupView({
                model: selected
            });

            groupView.stubsListener(action);
        },

        showAllLocations: function () {
            var locationsView = new CS.Locations.LocationListView({collection: i.locations});

            this.$modal(locationsView);
        },
        
        createEdit: function (group) {
            var createEditView = new This.CreateEditView(group);

            this.$modal(createEditView);
        },

        delete: function (group) {
            var groupDeleteView = new This.GroupDeleteView({
                model: group
            });

            this.$modal(groupDeleteView);
        },

        show404: function () {
            var errorPage = new This.ErrorPageView();

            $('.main-section').html(errorPage.render().$el);
        }
    });
})(CS.Groups);