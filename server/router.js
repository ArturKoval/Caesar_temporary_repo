'use strict';

var session = require('./sessions/Controller'),
    helper = require('./libs/helper'),
    _ = require('underscore'),
    dir = './';

function Router () {}

_.extend(Router.prototype, {
    routes: {
        index: {module: 'index', auth: true},
        admin: {module: 'admin', auth: true},
        locations: {module: 'locations', auth: true},
        preload: {module: 'preload', auth: true},
        login: {module: 'login', auth: false},
        logout: {module: 'login', auth: true},
        users: {module: 'users', auth: true},
        groups: {module:'groups', auth: true}
    },

    init: function (request, response, action, route) {
        var controller,
            currSession;

        if (this.routes[route]['auth']) {
            currSession = this.getSession(request);

            if (currSession){
                controller = require(dir + this.routes[route]['module'] + '/Controller');
                controller.initialize(request, response, action, currSession);
            } else {
                console.log('redirect');
                helper.sendFile(response, 'text/html', '../client/login.html');
            }
        } else {
            controller = require(dir + this.routes[route]['module'] + '/Controller');
            controller.initialize(request, response, action);
        }
    },

    getSession: function (request) {
        session.initialize(request);

        return session.checkAuth();
    }   
});

module.exports = new Router();