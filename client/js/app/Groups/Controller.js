'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'Groups: group selected': 'showSelectedGroup',
            'Groups: Edit button selected': 'showCreateEditView',
            'Locations: showLocationsView': 'showLocations',
            'Locations: showGroupsInLocation': 'getLocations',
            'Locations: chooseLocation': 'addClassButtonEl',
            'Groups: DeleteDialogCalled': 'showDeleteDialog'
        },

        initialize: function () {
            this.mediator = app.mediator;
        },

        start: function () {
            var groupListView = new This.GroupListView({
                collection: new This.GroupList(store.groups).findGroupsByLocations([app.user.location])
            });
			
            $('#left-side-bar').append(groupListView.$el).append(groupListView.render());
            $('#page').prepend(new SelectButtonView().render().$el.html('Show all locations')); //button to show all locations
			return app.user.location;
        },
		
		showLocationByRoute: function (location) {
			console.log(location);
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
            var groupView = new This.GroupView({
                model: list.findGroupByName(groupName)
            });
            
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
            var locationsView = new i.locations.LocationListView(),
                $modal = $('#modal-window');

            if ($modal.is(':empty')){
                $modal.append(locationsView.render().$el);
            }
        },

        addClassButtonEl: function () {
            $('.save').addClass('active-button');
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
        
        showCreateEditView: function () {
            var editCreateView = new This.CreateEditView();
            $('#modal-window').html(editCreateView.render().$el);
        },

        showDeleteDialog: function (group) {
            var groupDeleteView = new This.GroupDeleteView({
                model: group
            });

            $('#modal-window').append(groupDeleteView.render().el);
            groupDeleteView.$el.focus();
        }
    });
})(CS.Groups, app);