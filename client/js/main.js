'use strict';

var CS = {},
    app = {},
    templates = {},
    store = {},
    i = {};

System.register(CS, ['ErrorPage', 'Groups', 'User', 'Locations', 'filter', 'Messenger']);
System.register(app, ['mediator', 'router', 'subRouters', 'notFound', 'user', 'userController']);

$(function () {
    System.preload().then(main);
    
    function main () {
        app.mediator = new Mediator();
        app.filter = new CS.Filter();
        app.router = new CS.Router();
		
        app.userController = new CS.User.Controller();/**rename to user(resolve problem with naming)**/
        app.notFoundController = new CS.ErrorPage.Controller();
		app.messengerController = new CS.Messenger.Controller();

        Backbone.history.start({pushState: true});
    }
});
