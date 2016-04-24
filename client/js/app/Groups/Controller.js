'use strict';

(function (This, app, i) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'Groups: edit-request': 'showForm',
            'Groups: delete-request': 'delete',
            'Groups: create-request': 'showForm',
            'Locations: selected': 'render',
            'Paginator: page-selected': 'groupsRender'
        },

        initialize: function () {
            this.mediator = app.mediator;

            //Temporary button start
            $('#createGroup').on('click', function () {
                app.mediator.publish('Groups: create-request', null);
            });
            //Temporary button end

            this.contentView = new This.ContentView();
            

			this.$main = $('.main-section');
			this.$sidebar = $('#left-side-bar');
        },

        start: function () {
			var userLocation = app.user.get('location');
			$('#content-section').html(this.contentView.render(userLocation).$el);
			app.mediator.publish('Locations: selected', [userLocation]);
            this.render(userLocation);
            this.buttonShowAll();

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

        showPageByRoute: function (location, groupName) {
            if (store.locations.getNames().indexOf(location) > -1) {
			console.log('showPageByRoute: ', location);
			$('#content-section').html(this.contentView.render(location).$el);
			app.mediator.publish('Locations: selected', [location]);
                this.render(location);
                this.buttonShowAll();
	
                if (this.list(location).findGroupByName(groupName)) {
                    this.contentView.showSelectedGroup(this.list(location).findGroupByName(groupName));
					return this.list(location).findGroupByName(groupName);
                } else {
                    app.mediator.publish('Error: show-error-page', {elem: this.$main, message: 'such a group is not found'})
                }
            } else {
                app.mediator.publish('Error: show-error-page', {elem: this.$main, message: 'such a location is not found'})
            }
        },

		showLocationByRoute: function (location) {
			if (store.locations.getNames().indexOf(location) > -1) {
				this.render(location);
				$('#content-section').html(this.contentView.render(location).$el);
				app.mediator.publish('Locations: selected', [location]);
				this.buttonShowAll();
			} else {
				app.mediator.publish('Error: show-error-page', {elem: this.$main, message: 'such a location is not found'})
			}
		},

        showViewByRoute: function (location, groupName, action) {
            var show = this.showPageByRoute(location, groupName);
			if (show) {
				this.contentView.showSelectedGroup(show, action);
			}
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

        //Helpers

        modal: function (view) {
            $('#modal-window').append(view.render().$el);
        },

        buttonShowAll: function () {
			$('#page:not(:has(.btn.btn-primary))').prepend(new SelectButtonView().render().$el.html('Show all locations'));
		},

		list: function (data) {
             return store.groups.findGroupsByLocations(data);
        }
    });
})(CS.Groups, app, i);