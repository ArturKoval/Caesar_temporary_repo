'use strict';
var Store = require('./rotor/Store')

function Router () {
    this.routes = {
        locations: require('./locations/CoursesController'),
        preload: require('./preload/PreloadController')
    };
}

Router.prototype.init = function (request, response, action, route) {
    var controller = this.routes[route];

    controller.initialize(request, response, action);
}

module.exports = new Router();