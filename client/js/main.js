'use strict';

var CS = {},
    app = {},
    templates = {},
    store = {},
    i = {},
	/**move to System constants**/
    ESC = 27,
    ENTER = 13;

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
/**move info blocks to preload**/

i.roles = [
    'Teacher',
	'Coordinator',
	'Administrator'
];

i.directions = [
    'WebUI',
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

i.stages = ['boarding',
    'before-start',
    'in-process',
    'offering',
    'finished'
];