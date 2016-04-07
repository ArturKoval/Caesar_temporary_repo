'use strict';
(function (This, app)  {
    This.Router = Backbone.Router.extend({
        routes: {    
            '': 'getLocation', 
            'Groups': 'getLocation',
            'Groups/students': 'test',
        /*
            'Groups/:location': 'openLocation',
            'Groups/students': 'test',
            'Groups/:location/:group/info': 'openGroupInfo',
            'Groups/:location/:group/schedule': 'openGroupSchedule',
            'Groups/:location/:group/students': 'openGroupStudents',
            'Groups/:location/:group/notification': 'openGroupNotifi',
            'Groups/:location/:group/edit': 'openFormGroupEdit',
            'Groups/:location/:group/delete': 'openFormGroupDelete',
            'Groups/:location/:group/create': 'openFormGroupCreate',
            'Groups*path': 'notFound' */
        },

        initialize: function () {
            this.controller = new CS.Groups.Controller();
            Backbone.history.loadUrl(Backbone.history.fragment);
            app.mediator.subscribe('GroupEdit', this.navToGroupEdit, null, this);
            app.mediator.subscribe('GroupDelete', this.navToGroupDelete, null, this);
            app.mediator.subscribe('GrouoCreate', this.navToGroupCreate, null, this);
            app.mediator.subscribe('CancelAction', this.navToGroupCancelAction, null, this);
            app.mediator.subscribe('OpenInfoGroup', this.navToGroupAction, null, this);
            app.mediator.subscribe('OpenScheduleGroup', this.navToGroupAction, null, this);
            app.mediator.subscribe('OpenStudentsGroup', this.navToGroupAction, null, this);
            app.mediator.subscribe('OpenNotifiGroup', this.navToGroupAction, null, this);
        },
        
        test: function () {
            alert('AA');
            console.log('AA');
        },

        navToGroupAction: function (group, action) {
            var currentUrl = window.location.pathname;

            this.navigate(currentUrl + '/' + group + '/' + action);
        },

        navToGroupEdit: function (location, group) {
            var currentUrl = window.location.pathname;

            this.navigate(currentUrl + '/' + group + '/edit');
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

        getLocation: function () {
            var location = this.controller.start();
            this.navigate('Groups/' + location);
            
        },
        
        testOne: function () {
            this.navigate('Groups/');
            //var location = this.controller.getLocation();
            console.log('/');
  
            //this.controller.filterLocation(location);
        },

        openLocation: function (location) {
            this.controller.filterLocation(location);
        },

        openGroupInfo: function (location, group) {
            this.controller.filterGroup(location, group);
            this.navigate('Groups/' + location + '/' + group + '/info');
        },

        notFound: function () {
            app.mediator.publish('Show 404');
        }
    });
})(CS.Groups, app);