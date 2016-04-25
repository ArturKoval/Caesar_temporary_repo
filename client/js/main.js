'use strict';

var CS = {},
    app = {},
    templates = {},
    store = {},
    i = {};


System.register(CS, ['ErrorPage', 'Menu', 'Groups', 'Schedule', 'User', 'Locations', 'Messenger', 'About']);

System.register(app, ['mediator', 'filter', 'router', 'subRouters', 'notFound', 'user', 'userController']);

$(function () {
    System.startWebSocket();
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
