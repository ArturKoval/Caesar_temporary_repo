'use strict';

(function (This, app, i) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'CurrentGroup': 'createView'
        },

        initialize: function () {
            /* var groupListView = new This.groupListView(); */ //later

            var contentView = new This.ContentView({model: new This.Group(app.store.groups[3])}),
                groupView = new This.GroupView({model: new This.Group(app.store.groups[3])}),
                groupListView = new This.GroupListView({collection: new This.GroupList(app.store.groups)});
                
            $('#content-header').append(contentView.renderHeader().$el);
			$('#content-footer').append(contentView.renderFooter().$el);
            $('#left-side-bar').append(groupListView.$el)
                .append(groupListView.render());

            // var preloadView = new app.PreloadView();        // PreloadView Circle
            // $('#modal-window').append(preloadView.render().$el);// PreloadView Circle

            // var locationsView = new i.locations.LocationListView(); //All available LocationsView
            // $('#modal-window').append(locationsView.render().$el);

            /* this.collection = new This.GroupList(app.store.groups);
            console.log(this.collection); */
            //this.collection = new This.GroupList(app.store.groups);
            //console.log(this.collection); 


            this.mediator = app.mediator;    
        },
		
		createView: function (a) {
			console.log(a);
		}
    });
})(CS.Groups, app, i);