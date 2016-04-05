'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'CurrentGroup': 'createView'
        },

        initialize: function () {
			console.log('GroupPageController Initialized'); //debug
            /* var groupListView = new This.groupListView(); */ //later

            var contentView = new This.ContentView({model: new This.Group(app.store.groups[0])}),
                groupView = new This.GroupView({model: new This.Group(app.store.groups[0])}),
                groupInfoView = new This.GroupInfoView({model: new This.Group(app.store.groups[0])});

            $('#content-header').append(contentView.renderHeader().$el);
            $('#main-section').append(groupView.render().$el);
            $('#groupInfo').append(groupInfoView.render().$el);
			$('#content-footer').append(contentView.renderFooter().$el);

            /* this.collection = new This.GroupList(app.store.groups);
            console.log(this.collection); */

            this.mediator = app.mediator;    
        },
		
		createView: function (a) {
			console.log(a);
		}
    });
})(CS.Groups, app);