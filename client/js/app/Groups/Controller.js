'use strict';

(function (This) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'Groups: group-selected': 'showSelectedGroup',
            'Groups: edit-button-selected': 'createEdit',
            'Groups: delete-dialog-called': 'delete',
            'Groups: group-saved': 'showSelectedGroup',
            'Locations: Show-button selected': 'showAllLocations',
            'Locations: showGroupsInLocation': 'render'
        },

        initialize: function () {
            this.mediator = app.mediator;            
            this.$main = $('.main-section');
			
			// you can find temporary block below
			this.modal = function (view) {
                $('#modal-window').append(view.render().$el);
            };
            this.buttonShowAll = function () {
                $('#page').prepend(new SelectButtonView().render().$el.html('Show all locations'));
            };          
            $('#createGroup').on('click', function () {
                var createEditView = new This.CreateEditView();
                this.modal(createEditView);
            }.bind(this));
			// end of temporary block
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
            var groupListView = new This.GroupListView({
                    collection: this.list(location)
                }),
                $sidebar = $('#left-side-bar');
          		   
            $sidebar.html(groupListView.$el).append(groupListView.render());
			
            this.$main.empty();
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
            this.showSelectedGroupByRouter(this.list(location).findGroupByName(groupName), action);
        },

        showSelectedGroupByRouter: function (selected, action) {
            var contentView = new This.ContentView({
                    model: selected
                }),
                groupView = new This.GroupView({
                    model: selected
                });
                    
            contentView.render(); 
            groupView.stubsListener(action, 'info');    
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
        }
    });
})(CS.Groups);