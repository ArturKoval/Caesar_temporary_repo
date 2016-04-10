'use strict';
(function (This, app)  {
    This.Router = Backbone.Router.extend({
        currentUrl: window.location.pathname,

        routes: {    
            '': 'initLocation', 
            'Groups(/)': 'initLocation',
            'Groups/:location(/)': 'openLocation',
            'Groups/:location/:group(/)': 'openGroupInfo',
            'Groups/:location/:group/info(/)': 'openGroupInfo',
            'Groups/:location/:group/:action(/)': 'openGroupAction',
            'Groups/:location/:group/students(/)': 'openGroupStudents',
            'Groups/:location/:group/notification(/)': 'openGroupNotifi',
            'Groups/:location/:group/edit(/)': 'openFormGroupEdit',
            'Groups/:location/:group/delete(/)': 'openFormGroupDelete',
            'Groups/:location/:group/create(/)': 'openFormGroupCreate',
            'Groups*path': 'notFound' 
        },

        initialize: function () {
            this.controller = new CS.Groups.Controller();
            Backbone.history.loadUrl(Backbone.history.fragment); 
            app.mediator.subscribe('Groups: group selected', this.navToGroupSelected, null, this);
            app.mediator.subscribe('Groups: StubView changed', this.navToGroupAction, null, this);
            app.mediator.subscribe('Groups: Edit button selected', this.navToShowFormEdit, null, this);
            app.mediator.subscribe('Groups: DeleteDialogCalled', this.navToShowFormDelete, null, this);
            app.mediator.subscribe('Groups: Create', this.navToShowFormCreate, null, this);
            app.mediator.subscribe('Groups: delete group', this.navToDeleteGroup, null, this);
            app.mediator.subscribe('Groups: group saved', this.navToSaveGroup, null, this);
            app.mediator.subscribe('Groups: dialog closed', this.navToCancelForm, null, this);
        },

        navToGroupSelected: function (model) {
            var groupName = model.get('name'),
                location = model.get('location');

            this.navigate('Groups/' + location + '/' + groupName + '/info');
        },

        navToGroupAction: function (args) {
            var groupName = args.group.get('name'),
                location = args.group.get('location'),
                action = args.stubView;

            this.navigate('Groups/' + location + '/' + groupName + '/' + action);     
        },

        navToShowFormEdit: function () {
            this.currentUrl = window.location.pathname;
            this.navigate(this.currentUrl.split('/', 4).join('/') + '/edit');
        },

        navToShowFormDelete: function () {
            this.currentUrl = window.location.pathname;
            this.navigate(this.currentUrl.split('/', 4).join('/') + '/delete');
        },

        navToShowFormCreate: function () {
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
            this.controller.showPageByRoute(location, groupName);
            this.navigate('Groups/' + location + '/' + groupName + '/info');
        },

        openFormGroupDelete: function (location, groupName) {
            var modelGroup = this.controller.showPageByRoute(location, groupName);
            this.controller.showDeleteDialog(modelGroup);
        },

        openFormGroupEdit: function (location, groupName) {
            var modelGroup = this.controller.showPageByRoute(location, groupName);
            this.controller.showCreateEditView(modelGroup);
        },

        openGroupAction: function (location, groupName, action) {
            this.controller.showViewByRoute(location, groupName, action);
        },

        notFound: function () {
            app.mediator.publish('Groups: Show 404');
        }
    });
})(CS.Groups, app);