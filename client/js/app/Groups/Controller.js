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
                collection: new This.GroupList(store.groups)
            });

            $('#left-side-bar').append(groupListView.$el).append(groupListView.render());
            $('#page').prepend(new SelectButtonView().render().$el.html('Show all locations')); //button to show all locations
        },

        showSelectedGroup: function (selected) {
            var contentView = new This.ContentView({
                model: selected
            });
            
            contentView.render();
            $('.main-section').empty();
            var groupView = new This.GroupView({
                model: selected
            })
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
            $('.save').addClass('active-button');
        },
        
        locationRoute: function () {
            return app.user.location;
        },
                    
        showCreateEditView: function (group) {
            var editCreateView = new This.CreateEditView(group);
            $('#modal-window').html(editCreateView.render().$el);
        },

        showDeleteDialog: function (group) {
            var groupDeleteView = new This.GroupDeleteView({
                model: group
            });

            $('body').append(groupDeleteView.render().el);
        }
    });
})(CS.Groups, app);