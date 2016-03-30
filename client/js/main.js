'use strict';

var CS = {},
    app = {},
    templates = {},
    ESC = 27,
    ENTER = 13;

System.register(CS, ['Events', 'ErrorPage']);
System.register(app, ['mediator', 'router', 'subRouters', 'notFound']);

$(function () {
    System.setUpCollections().then(main);
    
    function main () {
        app.mediator = new Mediator();
        app.router = new CS.Router();
		app.subRouters = {};
        app.notFound = new CS.ErrorPage.Controller();
		
        Backbone.history.start({pushState: true});
    }
});