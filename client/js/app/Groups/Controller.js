'use strict';

(function (This) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'Groups: group-selected': 'showSelectedGroup',
            'Groups: edit-button-selected': 'createEdit',
            'Groups: delete-dialog-called': 'delete',
            'Groups: group-saved': 'showSelectedGroup',
            'Locations: show-button-selected': 'showAllLocations',
            'Locations: show-groups-in-location': 'render',
            'Paginator: collection-divided': 'groupsRender'
        },

        initialize: function () {
            this.mediator = app.mediator;            
            this.$main = $('.main-section');

            //Temporary button start
            $('#createGroup').on('click', function () {
                var createEditView = new This.CreateEditView();
                this.modal(createEditView);
            }.bind(this));
            //Temporary button end
        },

		list: function (data) {
             return new This.GroupList(store.groups).findGroupsByLocations(data);
        },
			
        start: function () {
            this.render(app.user.get('location'));
            this.buttonShowAll();

            return app.user.get('location');
        },

        render: function (location) {
            var $sidebar = $('#left-side-bar');

            this.groupListView = new This.GroupListView({
                    collection: this.list(location)
                });

            $sidebar.html(this.groupListView.$el).append(this.groupListView.render());
        },

        groupsRender: function(collection) {
            this.groupListView.renderGroups(collection);
        },

        showPageByRoute: function (location, groupName) {
            if (i.locations.indexOf(location) > -1) {
                this.render(location);
                this.buttonShowAll();

                if (this.list(location).findGroupByName(groupName)) {
                    this.showSelectedGroup(this.list(location).findGroupByName(groupName));
                } else {
                    app.mediator.publish('Error by route', {elem: this.$main, message: 'such a group is not found'})
                }
            } else {
                app.mediator.publish('Error by route', {elem: this.$main, message: 'such a location is not found'})
            }

            return this.list(location).findGroupByName(groupName);
        },

		showLocationByRoute: function (location) {
			if (i.locations.indexOf(location) > -1) {
				this.render(location);
				this.buttonShowAll();
			} else {
				app.mediator.publish('Error by route', {elem: this.$main, message: 'such a location is not found'})
			}
		},

        showViewByRoute: function (location, groupName, action) {
            this.render(location);
            this.buttonShowAll();
            this.showSelectedGroup(this.list(location).findGroupByName(groupName), action);
        },

        showSelectedGroup: function (selected) {
            var contentView = new This.ContentView({
                    model: selected
                }),
				groupView = new This.GroupView({
                    model: selected
                });
            		
            contentView.render();
            groupView.stubsListener('info');
        },

        showAllLocations: function () {
            var locationsView = new CS.Locations.LocationListView({collection: i.locations});

            this.modal(locationsView);
        },
        
        createEdit: function (group) {
            var createEditView = new This.CreateEditView(group);

            this.modal(createEditView);
        },

        delete: function (group) {
            var groupDeleteView = new This.GroupDeleteView({
                model: group
            });

            this.modal(groupDeleteView);
        },

        //Helpers

        modal: function (view) {
            $('#modal-window').append(view.render().$el);
        },

        buttonShowAll: function () {
            $('#page').prepend(new SelectButtonView().render().$el.html('Show all locations'));
        },

        list: function (data) {
            return new This.GroupList(store.groups).findGroupsByLocations(data);
        }
    });
})(CS.Groups);