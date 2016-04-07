'use strict';
var fs = require('fs');

var Router = (function () {
    var file = './courses.json';

    function Router () {
        this.routes = {
            locations: require('./courses/CoursesController'),
        };
    }

    Router.prototype.init = function (request, response, action, route) {
        var controller = this.routes[route];

        controller.init(request, response, action);
    }

    return Router;
})();

module.exports = new Router();