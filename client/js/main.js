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

i.directions = [
    'Web UI',
    'JavaScript(UI)',
    'LAMP',
    '.Net',
    'iOS',
    'C/C++',
    'Delphi',
    'RDBMS',
    'MQC',
    'ATQC',
    'ISTQB',
    'DevOps',
    'UX'
];

i.teachers = [
    'M. Demchyna',
    'M. Lopatynska',
    'M. Plesha',
    'V. Ryazhska',
    'A. Korkuna',
    'L. Halamaha',
    'Y. Harasym',
    'I. Kohut',
    'L. Klakovych',
    'V. Koldovskyy',
    'N. Romanenko',
    'A. Pertsov',
    'O. Shvets`',
    'O. Reuta',
    'I. Tsvietkov',
    'Y. Bezgachnyuk',
    'D. Petin',
    'M. Omel`chuk',
    'B. Yulian'
];


