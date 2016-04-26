'use strict';

(function (This, app, i, menu) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'Groups: edit-request': 'showForm',
            'Groups: delete-request': 'delete',
            'Groups: create-request': 'showForm',
            'Locations: selected': 'render',
            'Groups: selected': 'showSelectedGroup',
            'Groups: saved': 'showSelectedGroup',
            'Paginator: page-selected': 'groupsRender'
        },

        initialize: function () {
            this.mediator = app.mediator;
			
            this.$leftMenu = $('.left-menu');
			
			this.$sidebar = $('#left-side-bar');
            this.$content = $('#content-section');
			
            this.contextMenu  = new menu.ContextMenuView({el: this.$leftMenu});
			
            this.contentView = new This.ContentView();
			this.$content.html(this.contentView.render().$el);
			this.$main = $('.main-section');
        },

        start: function () {
			var userLocation = app.user.get('location');

			app.mediator.publish('Locations: selected', [userLocation]);
            
            return userLocation;
        },

        render: function () {
            this.groupListView = new This.GroupListView({
                collection: store.groups
            });

            this.$sidebar.html(this.groupListView.render().el);
        },

        groupsRender: function(collection) {
            this.groupListView.renderGroups(collection);
        },

		showLocationByRoute: function (location) {
			if (store.locations.getNames().indexOf(location) > -1) {
				app.mediator.publish('Locations: selected', [location]);
			} else {
				app.mediator.publish('Error: show-error-page', {elem: this.$main, message: 'such a location is not found'})
			}
		},

        showGroupViewByRoute: function (location, groupName, action) {
			this.showLocationByRoute(location);
			if(this.list(location).findGroupByName(groupName)) {
				this.showSelectedGroup(this.list(location).findGroupByName(groupName), action);
			} else {
                app.mediator.publish('Error: show-error-page', {elem: this.$main, message: 'such a group is not found'})
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
})(CS.Groups, app, i, CS.Menu);