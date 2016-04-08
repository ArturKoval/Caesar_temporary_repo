'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'groups: group selected': 'showSelectedGroup',
            'Groups: Edit button selected': 'showCreateEditView',
            'Locations: showLocationsView': 'showLocations',
            'Locations: showGroupsInLocation': 'getLocations',
            'Locations: chooseLocation': 'addClassButtonEl'
        },

        initialize: function () {
            var groupListView = new This.GroupListView({
                    collection: new This.GroupList(store.groups)
                });

            $('#left-side-bar').append(groupListView.$el).append(groupListView.render());
            this.mediator = app.mediator;
            $('#page').prepend(new SelectButtonView().render().$el.html('Show all locations')); //button to show all locations
        },

        start: function () {
            return app.user.location;
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
            var locationsView = new i.locations.LocationListView(); //All available LocationsView
            $('#modal-window').append(locationsView.render().$el);
        },

        addClassButtonEl: function () {
            $('.save').addClass('active-button');
        },

        getLocations: function (locations) {
            $('.save').addClass('active-button');
            console.log(locations);
        },

        showCreateEditView: function () {
            var editCreateView = new This.CreateEditView();
            $('#modal-window').html(editCreateView.render().$el);
        }
    });
})(CS.Groups, app);