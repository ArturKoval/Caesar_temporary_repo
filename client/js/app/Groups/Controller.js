'use strict';

(function (This, app, i) {
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

            //Temporary buttons start
            $('#createGroup').on('click', function () {
                app.mediator.publish('Groups: create-request', null);
            });

            //Temporary button end
            this.coll = [{icon:'fa fa-globe fa-2x', description: 'locations'},
                {icon:'fa fa-file-text-o fa-2x', description: 'add'},
                {icon:'fa fa-calendar fa-2x', description: 'add'},
                {icon:'fa fa-users fa-2x', description: 'add'},
                {icon:'fa fa-envelope-o fa-2x', description: 'add'},
                {icon:'fa fa-info fa-2x', description: 'add'}];
            this.menuColl = new CS.Menu.Menu(this.coll);
            this.mainMenu = new CS.Menu.MainMenuView({collection: this.menuColl, el: $('.top-menu')});
            this.mainMenu.render();
            
            $('.timeBarContainer')
                .on('mouseover', function () {
                    this.timeBarView = new CS.Messenger.TimeBarView({
                        model: new CS.Messenger.Clock()
                    });
                $('.flashMessage').html(this.timeBarView.render().el);
            })
                .on('mouseleave', function () {
                    this.timeBarView.remove();
            });
            //Temporary buttons end

            this.contentView = new This.ContentView();

			this.$main = $('.main-section');
			this.$sidebar = $('#left-side-bar');
            this.$content = $('#content-section');
        },

        start: function () {
			var userLocation = app.user.get('location');

			this.$content.html(this.contentView.render(userLocation).$el);
			app.mediator.publish('Locations: selected', [userLocation]);
            this.render(userLocation);

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
			    this.$content.html(this.contentView.render(location).$el);
			    app.mediator.publish('Locations: selected', [location]);
                this.render(location);
	
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
				this.$content.html(this.contentView.render(location).$el);
				app.mediator.publish('Locations: selected', [location]);
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