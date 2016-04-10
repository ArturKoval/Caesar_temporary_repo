'use strict';

var CS = {},
    app = {},
    templates = {},
    store = {},
    i = {},
    ESC = 27,
    ENTER = 13;

System.register(CS, ['ErrorPage', 'Groups', 'User', 'Locations']);
System.register(app, ['mediator', 'router', 'subRouters', 'notFound', 'user', 'filter']);

$(function () {
    System.preload().then(main);
    
    function main () {
        app.mediator = new Mediator();
        app.filter = new app.Filter();
        app.router = new CS.Router();
		app.subRouters = {};
        var userController = new CS.User.Controller();
        //app.notFound = new CS.ErrorPage.Controller();
		
        Backbone.history.start({pushState: true});
    }
});


