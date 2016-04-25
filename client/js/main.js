'use strict';

var CS = {},
    app = {},
    templates = {},
    store = {},
    i = {};

System.register(CS, ['ErrorPage', 'Menu', 'Groups', 'User', 'Locations', 'Messenger', 'About', 'Menu']);
System.register(app, ['mediator', 'filter', 'router', 'subRouters', 'notFound', 'user', 'userController']);

$(function () {
    System.preload().then(main);
    
    function main () {
        app.mediator = new Mediator();
        app.filter = new CS.Filter();
        app.router = new CS.Router();
		
        app.userController = new CS.User.Controller();
        app.notFoundController = new CS.ErrorPage.Controller();
		app.messengerController = new CS.Messenger.Controller();
        app.locationsController = new CS.Locations.Controller();

        app.contextMenu  = new CS.Menu.ContextMenuView({el: '.left-menu'});

        Backbone.history.start({pushState: true});
    }
});
