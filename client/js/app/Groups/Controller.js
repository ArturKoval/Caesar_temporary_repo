'use strict';

(function (This, app, i) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'Groups: edit-request': 'showForm',
            'Groups: delete-request': 'delete',
            'Groups: create-request': 'showForm',
            'Locations: selected': 'groupsRender',
            'Groups: selected': 'showSelectedGroup',
            'Groups: saved': 'showSelectedGroup',
            'GroupList paginator: page-selected': 'groupsRender'
        },

        initialize: function () {
            this.mediator = app.mediator;
			this.$sidebar = $('.left-side-bar');
            this.$content = $('.content-section');
			
			this.$sidebar = $('#left-side-bar');
            this.$content = $('#content-section');
			
            this.contentView = new This.ContentView();
			this.$content.html(this.contentView.render().$el);
			this.$main = $('.main-section');
            this.groupListView = new This.GroupListView({
                collection: store.groups
            });
            this.render();
        },

        start: function () {
			var userLocation = app.user.get('location');
            this.$content.html(this.contentView.render().$el);
			app.mediator.publish('Locations: selected', [userLocation]);
            
            return userLocation;
        },

        render: function () {
            this.$sidebar.html(this.groupListView.render().el);
        },

        groupsRender: function(collection) {
            this.groupListView.renderGroups(collection);
        },

		showLocationByRoute: function (location) {
			if (store.locations.getNames().indexOf(location) > -1) {
				app.mediator.publish('Locations: selected', [location]);
			} else {
				app.mediator.publish('Error: show-error-page', {elem: this.$main, message: 'such a location is not found'});

                return false;
			}

            return true;
		},

        showGroupViewByRoute: function (location, groupName, action) {
            if (this.showLocationByRoute(location)) {
                if(this.list(location).findGroupByName(groupName)) {
                    this.showSelectedGroup(this.list(location).findGroupByName(groupName), action);
                } else {
                    app.mediator.publish('Error: show-error-page', {elem: this.$main, message: 'such a group is not found'});
                }
            }

			return this.list(location).findGroupByName(groupName);
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

        //Helpers

        modal: function (view) {
            $('#modal-window').html(view.render().$el);
        },

		list: function (data) {
             return store.groups.findGroupsByLocations(data);
        }
    });
})(CS.Groups, app, i);