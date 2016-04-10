'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'Groups: group selected': 'showSelectedGroup',
            'Groups: Edit button selected': 'showCreateEditView',
            'Locations: Show-button selected': 'showLocations',
            'Locations: showGroupsInLocation': 'getLocations',
            'Locations: chooseLocation': 'addClassButtonEl',
            'Groups: DeleteDialogCalled': 'showDeleteDialog',
            'Groups: group saved': 'showSelectedGroup',
            'Groups: Show 404': 'showMessege404'
        },

        initialize: function () {
            this.mediator = app.mediator;
        },

        start: function () {

            var groupListView = new This.GroupListView({
                collection: new This.GroupList(store.groups).findGroupsByLocations([app.user.location])
            });
            $('#createGroup').on('click', function () {
                 var editCreateView = new This.CreateEditView();
                 $('#modal-window').html(editCreateView.render().$el);
            });
            $('#left-side-bar').append(groupListView.$el).append(groupListView.render());
            $('#page').prepend(new SelectButtonView().render().$el.html('Show all locations')); //button to show all locations
            
            return app.user.location;
        },
        
        showLocationByRoute: function (location) {
            var groupListView = new This.GroupListView({
                collection: new This.GroupList(store.groups).findGroupsByLocations(location)
            });

            $('#left-side-bar').append(groupListView.$el).append(groupListView.render());
            $('#page').prepend(new SelectButtonView().render().$el.html('Show all locations')); //button to show all locations
        },
        
        showPageByRoute: function (location, groupName) {
            var list = new This.GroupList(store.groups).findGroupsByLocations(location);
            var groupListView = new This.GroupListView({
                collection: list
            });
            $('#left-side-bar').append(groupListView.$el).append(groupListView.render());
            $('#page').prepend(new SelectButtonView().render().$el.html('Show all locations')); //button to show all locations
            
            var contentView = new This.ContentView({
                model: list.findGroupByName(groupName)
            });
             contentView.render();
            $('.main-section').empty();

            this.render([app.user.location]);
			$('#createGroup').on('click', function () {
                 var editCreateView = new This.CreateEditView();
                 $('#modal-window').html(editCreateView.render().$el);
            });
            this.btnShowAll();

			return app.user.location;
        },

        render: function (data) {
            var groupListView = new This.GroupListView({
                collection: new This.GroupList(store.groups).findGroupsByLocations(data)
            });

            $('#left-side-bar').append(groupListView.$el).append(groupListView.render());
        },

        btnShowAll: function () {
            $('#page').prepend(new SelectButtonView().render().$el.html('Show all locations'));
        },
		
		showLocationByRoute: function (location) {
            this.render(location);
            this.btnShowAll();
		},
		
		showPageByRoute: function (location, groupName) {
			var list = new This.GroupList(store.groups).findGroupsByLocations(location),
				groupListView = new This.GroupListView({
                	collection: list
            	});

            $('#left-side-bar').append(groupListView.$el).append(groupListView.render());
            this.btnShowAll();
			
			var contentView = new This.ContentView({
                model: list.findGroupByName(groupName)
            });

			contentView.render();
			$('.main-section').empty();

            var groupView = new This.GroupView({
               	model: list.findGroupByName(groupName)
            });

            return list.findGroupByName(groupName);
        },

        showViewByRoute: function (location, groupName, action) {
            var list = new This.GroupList(store.groups).findGroupsByLocations(location);
            var groupListView = new This.GroupListView({
                collection: list
            });
            $('#left-side-bar').append(groupListView.$el).append(groupListView.render());
            $('#page').prepend(new SelectButtonView().render().$el.html('Show all locations')); //button to show all locations
            
            var contentView = new This.ContentView({
                model: list.findGroupByName(groupName)
            });
             contentView.render();
            $('.main-section').empty();
            var groupView = new This.GroupView({
                model: list.findGroupByName(groupName)
            });

            groupView.stubsListener(action);
        },
		

        showSelectedGroup: function (selected) {
            var contentView = new This.ContentView({
                model: selected
            });
            
            contentView.render();
            $('.main-section').empty();
            var groupView = new This.GroupView({
                model: selected
            });
        },

        showLocations: function () {
            var locationsView = new CS.Locations.LocationListView({collection: i.locations}),
                $modal = $('#modal-window');

            $modal.append(locationsView.render().$el);
        },

        getLocations: function (locations) {
            this.renderView(locations);
            $('.save').addClass('active-button');
        },
        
        renderView: function (locations) {
            var groupListView = new This.GroupListView({
                collection: new This.GroupList(store.groups).findGroupsByLocations(locations)
            });
            
            $('#left-side-bar').empty();
            $('#left-side-bar').append(groupListView.$el).append(groupListView.render());
        },
        
        showCreateEditView: function (group) {
            var editCreateView = new This.CreateEditView(group);
            $('#modal-window').html(editCreateView.render().$el);
        },

        showDeleteDialog: function (group) {
            var groupDeleteView = new This.GroupDeleteView({
                model: group
            });

            $('#modal-window').append(groupDeleteView.render().el);
            groupDeleteView.$el.focus();
        },

        showMessege404: function () {
            var errorPage = new This.ErrorPageView();

            $('.main-section').html(errorPage.render().$el)
        }
    });
})(CS.Groups, app, CS.Locations);