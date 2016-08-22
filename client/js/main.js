'use strict';

var CS = {},
    app = {},
    templates = {},
    store = {},
    i = {};


System.register(CS, ['ErrorPage', 'Menu', 'Groups', 'Students', 'Schedule', 'User', 'Locations', 'Messenger', 'About', 'Storage']);

System.register(app, ['mediator', 'filter', 'router', 'subRouters', 'notFound', 'user', 'userController', 'menuController', 'infoblock', 'preload']);

$(function () {
    new System.Request().send().then(main, {
        groups: CS.Groups.GroupList,
        locations: CS.Locations.LocationList,
        users: CS.User.User
    });

    new System.Request().send({ URL: '/students'}).then(distribute, {
        students: CS.Students.Students
    });

    // System.preload({ URL: '/preload'}).then(main);
    // System.startWebSocket();

    function main () {
        app.mediator = new Mediator();
        app.filter = new CS.Filter();
        app.router = new CS.Router();

        app.preload = new CS.Storage.Controller().load();

        app.userController = new CS.User.Controller();
        app.notFoundController = new CS.ErrorPage.Controller();
        app.messengerController = new CS.Messenger.Controller();
        app.locationsController = new CS.Locations.Controller();
        app.menuController  = new CS.Menu.Controller();

        Backbone.history.start({pushState: true});
    }
});
