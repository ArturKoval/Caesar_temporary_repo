'use strict';

var CS = {},
    app = {},
    templates = {},
    store = {},
    i = {};

System.register(CS, ['ErrorPage', 'Groups', 'User', 'Locations', 'Messenger']);
System.register(app, ['mediator', 'router', 'subRouters', 'notFound', 'user', 'filter', 'userController']);

$(function () {
    System.preload().then(main);
    
    function main () {
        app.mediator = new Mediator();
        app.filter = new app.Filter();/**CS.Filter**/
        app.router = new CS.Router();
		
        app.userController = new CS.User.Controller();/**rename to user(resolve problem with naming)**/
        app.notFound = new CS.ErrorPage.Controller();
		app.messenger = new CS.Messenger.Controller();

        Backbone.history.start({pushState: true});
    }
});
