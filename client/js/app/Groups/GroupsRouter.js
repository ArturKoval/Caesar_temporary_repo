'use strict';
(function (This, app)  {
    This.Router = Backbone.Router.extend({
        currentUrl: 'Groups',
        
        subscribes: {
            'Groups: selected': 'navToGroupSelected',
            'Groups: stubView-changed': 'navToGroupAction',
            'Groups: edit-request': 'navToShowFormEdit',
            'Groups: delete-request': 'navToShowFormDelete',
            'Groups: create-request': 'navToShowFormCreate',
            'Groups: delete-group': 'navToDeleteGroup',
            'Groups: saved': 'navToSaveGroup',
            'Groups: dialog-closed': 'navToCancelForm'
        },
        
        routes: {    
            '': 'initLocation', 
            'Groups(/)': 'initLocation',
            'Groups/:location(/)': 'openLocation',
			'Groups/:location/create(/)': 'openGroupCreate',
            'Groups/:location/:group(/)': 'openGroupInfo',
            'Groups/:location/:group/edit(/)': 'openGroupEdit',
            'Groups/:location/:group/delete(/)': 'openGroupDelete',
            
            'Groups/:location/:group/:action(/)': 'openGroupAction',
            'Groups*path': 'notFound' 
        },
        
        initialize: function () {
            app.mediator.multiSubscribe(this.subscribes, this);
            
            this.controller = new CS.Groups.Controller();
			
            Backbone.history.loadUrl(Backbone.history.fragment);
        },

        navToGroupSelected: function (model) {
            var groupName = model.get('name'),
                location = model.get('location');

            this.navigate('Groups/' + location + '/' + groupName + '/info');
        },

        navToGroupAction: function (args) {
            var groupName = args.group.get('name'),
                location = args.group.get('location'),
                action = args.stubView; /**rename stub**/

            this.navigate('Groups/' + location + '/' + groupName + '/' + action);
        },

        navToShowFormEdit: function () {
			/**create function prepareCurrentUrl **/
            this.currentUrl = window.location.pathname;
            this.navigate(this.currentUrl.split('/', 4).join('/') + '/edit');
        },

        navToShowFormDelete: function () {
			/**create function prepareCurrentUrl **/
            this.currentUrl = window.location.pathname;
            this.navigate(this.currentUrl.split('/', 4).join('/') + '/delete');
        },

        navToShowFormCreate: function () {
			/**create function prepareCurrentUrl **/
            this.currentUrl = window.location.pathname;
            this.navigate(this.currentUrl.split('/', 3).join('/') + '/create');
        },

        navToCancelForm: function () {
            this.navigate(this.currentUrl);
        },

        navToDeleteGroup: function () {
            this.navigate(this.currentUrl.split('/', 3).join('/'));
        },

        navToSaveGroup: function (model) {
            var groupName = model.get('name'),
                location = model.get('location');

            this.navigate('Groups/' + location + '/' + groupName + '/info');
        },

        initLocation: function () {
            var location = this.controller.start();
            this.navigate('Groups/' + location);     
        },
        
        openLocation: function (location) {
            this.controller.showLocationByRoute(location);
        },

        openGroupInfo: function (location, groupName) {
            var modelGroup = this.controller.showPageByRoute(location, groupName);

            if (modelGroup) {
                this.navigate('Groups/' + location + '/' + groupName + '/info');
            }     
        },

        openGroupDelete: function (location, groupName) {
            var modelGroup = this.controller.showPageByRoute(location, groupName);

            this.controller.delete(modelGroup);
        },

        openGroupEdit: function (location, groupName) {
            var modelGroup = this.controller.showPageByRoute(location, groupName);
			console.log(modelGroup);
            if (modelGroup) {
                this.controller.showForm(modelGroup);
            }      
        },
		
		openGroupCreate: function (location) {
			this.openLocation(location);
			this.controller.showForm();
		},

        openGroupAction: function (location, groupName, action) {
            var actions = {
                    'info': true,
                    'students': true,
                    'shedule': true,
                    'message': true
                };

            if (actions[action]) {
                this.controller.showViewByRoute(location, groupName, action);
            } else {
                this.openGroupInfo(location, groupName);
            }   
        },

        notFound: function () {
            app.mediator.publish('Error: show-page-404');
        }
    });
})(CS.Groups, app);