'use strict';

var CS = {},
    app = {},
    templates = {},
    store = {},
    i = {},
    ESC = 27,
    ENTER = 13;

System.register(CS, ['ErrorPage', 'Groups', 'User']);
System.register(app, ['mediator', 'router', 'subRouters', 'notFound', 'user']);
System.register(i, ['locations', 'directions']);

$(function () {
    System.preload().then(main);
    
    function main () {
        app.mediator = new Mediator();
        app.router = new CS.Router();
		app.subRouters = {};
        var userController = new CS.User.Controller();
        //app.notFound = new CS.ErrorPage.Controller();
		
        Backbone.history.start({pushState: true});
    }
});

i.locations = [
  'Chernivtsy','Ivano-Frankivsk', 'Dnipro', 'Rivne', 'Kyiv', 'Sofia', 'Lviv'
];

