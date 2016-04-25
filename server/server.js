var http = require('http'),
    path = require('path'),
    helper = require('./libs/helper'),
    router = require('./router'),
    socket = require('./socket'),
    mediator = require('./libs/mediator');

http.createServer(start).listen(3000);
global.mediator = mediator;

socket.start();
console.log('server started...');

function start (request, response, errRoute) {
    var types = {
            'html': 'text/html',
            'js': 'application/javascript',
            'css': 'text/css',
            'json': 'application/json',
            'ico': 'image/ico',
            'png': 'image/png',
            'svg':"image/svg+xml",
            'ttf': "application/x-font-ttf",
            'otf': "application/x-font-opentype",
            'woff': "application/font-woff",
            'woff2': "application/font-woff2",
            'eot': "application/vnd.ms-fontobject"
        },

        dir = '../client',
        contentType,
        extention,
        filePath,
        urlData,
        action,
        route;
	
	if (errRoute) {
		route = errRoute;
    } else if (request.url == '/') {
        route = 'index';
	} else {
		urlData = request.url.substr(1, request.url.length).split('/');
        route = urlData[0];
        action = urlData[1];
	} 
    
    if (router.routes[route]){
        router.init(request, response, action, route);
    } else {
        filePath = dir + request.url;
        extention = path.extname(filePath);
        contentType = types[extention.substr(1, extention.length)];

        helper.sendFile(response, contentType, filePath, request, start);
    }
}

