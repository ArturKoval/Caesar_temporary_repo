'use strict';

var fs = require('fs');

function Router () {
    this.routes = {
        locations: require('./locations/CoursesController'),
        preload: require('./preload/PreloadController'),
        login: require('./login/Login'),
        groups: require('./groups/GroupsController'),
    };
}

Router.prototype.init = function (request, response, action, route) {
    var controller;

    if (route === 'login' && request.method == 'GET') {
        sendFile(response, 'text/html', '../client/login.html');
    } else {
        controller = this.routes[route];
        console.log('test')
        controller.initialize(request, response, action);
    }
    
}
/* move to helpers*/
function sendFile (response, contentType, filePath) {
    fs.stat(filePath, function (err, stats) {
        if (stats) {
            fs.readFile(filePath, function(error, data) {
                if (error) {
                    response.writeHead(500);
                    response.end();
                } else {
                    response.writeHead(200, {'Content-Type': contentType});
                    response.write(data);
                    response.end();
                }
            });
        } else {
            fs.readFile('../client/home.html', function(error, data) {
                if (error) {
                    response.writeHead(500);
                    response.end();
                } else {
                    response.writeHead(200, {'Content-Type': contentType});
                    response.write(data);
                    response.end();
                }
            });
        }
    });
}
/* move to helpers*/

module.exports = new Router();