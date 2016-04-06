'use strict';

var CS = {},
    app = {},
    templates = {},
    i = {},
    ESC = 27,
    ENTER = 13;

System.register(CS, ['Events', 'ErrorPage', 'Groups', 'User']);
System.register(app, ['mediator', 'store', 'router', 'subRouters', 'notFound']);
System.register(i, ['locations', 'directions']);

$(function () {
    System.preload().then(main);
    //main();
    
    function main () {
      
        app.mediator = new Mediator();
        app.router = new CS.Router();
		app.subRouters = {};
        var userController = new CS.User.Controller();
        //app.notFound = new CS.ErrorPage.Controller();
		
        Backbone.history.start({pushState: true});
        
    }
});
app.store.user = {
    name: 'John Doe',
    role: 'ITA Teacher',
    location: 'Dnipro',
    photo: 'default-photo.png'
};

i.locations = [
  'Chernivtsy','Ivano-Frankivsk', 'Dnipro', 'Rivne', 'Kyiv', 'Sofia', 'Lviv'
];