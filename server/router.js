'use strict';

var fs = require('fs'),
    session = require('./sessions/Controller'),
    dir = './';

function Router () {
    this.routes = {
        index: {module: '../client/home.html', auth: true},
        locations: {module: 'locations', auth: true},
        preload: {module: 'preload', auth: true},
        login: {module: 'login', auth: false},
		users: {module: 'users', auth: true},
        groups: {module:'groups', auth: true}
    };
}

Router.prototype.init = function (request, response, action, route) {
    var controller,
        currSession;

    if (route === 'login' && request.method == 'GET') {
        sendFile(response, 'text/html', '../client/login.html');
    } else if (this.routes[route]['auth']) {
        session.initialize(request);

        currSession = session.checkAuth()

        if (currSession){
            if (route === 'index') {
                sendFile(response, 'text/html', this.routes[route]['module'])
            } else {
                controller = require(dir + this.routes[route]['module'] + '/Controller');
                controller.initialize(request, response, action, currSession);
            }    
        } else {
			console.log('redirect');
            sendFile(response, 'text/html', '../client/login.html');
        }
    } else {
        controller = require(dir + this.routes[route]['module'] + '/Controller');
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
        } 
    });
}
/* move to helpers*/

module.exports = new Router();