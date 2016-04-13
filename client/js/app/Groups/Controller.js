'use strict';

(function (This) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'Groups: group selected': 'showSelectedGroup',
            'Groups: Edit button selected': 'createEdit',
            'Groups: DeleteDialogCalled': 'delete',
            'Groups: group-saved': 'showSelectedGroup',
            'Groups: Show 404': 'show404',
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
            this.render(location);
            this.buttonShowAll();
            this.showSelectedGroup(this.list(location).findGroupByName(groupName));

            return this.list(location).findGroupByName(groupName);
        },

		showLocationByRoute: function (location) {
			if (i.locations.indexOf(location) > -1) {
				this.render(location);
				this.buttonShowAll();
			} else {
				//404 'Not Found'
			}
		},

        showViewByRoute: function (location, groupName, action) {
            this.render(location);
            this.buttonShowAll();
            this.showSelectedGroup(this.list(location).findGroupByName(groupName), action);
        },

        showSelectedGroup: function (selected, action) {
            var contentView = new This.ContentView({
                    model: selected
                }),
				groupView = new This.GroupView({
                    model: selected
                });
            		
            contentView.render();
            //this.$main.empty();
            
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

        show404: function () {
            var errorPage = new This.ErrorPageView();

            this.$main.html(errorPage.render().$el);
        }
    });
})(CS.Groups);