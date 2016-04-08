'use strict';
(function (This, app)  {
    This.Router = Backbone.Router.extend({
        routes: {    
            '': 'initLocation', 
            'Groups': 'initLocation',
            'Groups/:location': 'openLocation',
            'Groups/:location/:group': 'openGroupInfo',
            'Groups/:location/:group/info': 'openGroupInfo',
            'Groups/:location/:group/schedule': 'openGroupSchedule',
            'Groups/:location/:group/students': 'openGroupStudents',
            'Groups/:location/:group/notification': 'openGroupNotifi',
            'Groups/:location/:group/edit': 'openFormGroupEdit',
            'Groups/:location/:group/delete': 'openFormGroupDelete',
            'Groups/:location/:group/create': 'openFormGroupCreate',
            'Groups*path': 'notFound' 
        },

        initialize: function () {
            this.controller = new CS.Groups.Controller();
            Backbone.history.loadUrl(Backbone.history.fragment); 
            app.mediator.subscribe('Groups: group selected', this.navToGroupSelected, null, this);
            app.mediator.subscribe('Groups: StubView changed', this.navToGroupAction, null, this);
            app.mediator.subscribe('GroupEdit', this.navToGroupEdit, null, this);
            app.mediator.subscribe('GroupDelete', this.navToGroupDelete, null, this);
            app.mediator.subscribe('GrouoCreate', this.navToGroupCreate, null, this);
            app.mediator.subscribe('CancelAction', this.navToGroupCancelAction, null, this);
        },

        navToGroupSelected: function (model) {
            var group = model.get('name'),
                location = model.get('location');

            this.navigate('Groups/' + location + '/' + group);
        },

        navToGroupAction: function (args) {
            var group = args.group.get('name'),
                location = args.group.get('location'),
                action = args.stubView;

            this.navigate('Groups/' + location + '/' + group + '/' + action);     
        },

        navToGroupEdit: function (location, group) {
            var currentUrl = window.location.pathname;

            this.navigate('currentUrl' + '/' + group + '/edit');
        },

        navToGroupDelete: function (location, group) {
            this.navigate('Groups/' + location + '/' + group + '/delete');
        },

        navToGroupCreate: function (location, group) {
            this.navigate('Groups/' + location + '/' + group + '/create');
        },

        navToGroupCancelAction: function (location, group) {
            this.navigate('Groups/' + location + '/' + group);
        },

        initLocation: function () {
            var location = this.controller.start();
            this.navigate('Groups/' + location);     
        },
        
        openLocation: function (location) {
            this.controller.showLocationByRoute(location);
        },

        openGroupInfo: function (location, groupName) {
            this.controller.showPageByRoute(location, groupName);
        },

        notFound: function () {
            app.mediator.publish('Show 404');
        }
    });
})(CS.Groups, app);