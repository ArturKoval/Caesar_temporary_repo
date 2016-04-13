var http = require('http'),
    path = require('path'),
    fs = require('fs'),
    router = require('./router');

http.createServer(start).listen(3000);
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
	
	if (!errRoute) {
		urlData = request.url.substr(1, request.url.length).split('/');
		route = urlData[0];
		action = urlData[1];
	} else {
		route = errRoute;
	} 

    if (request.url == '/') {
        route = 'index';
    }
    
    if (router.routes[route]){
        router.init(request, response, action, route);
    } else {
        filePath = dir + request.url;
        
        if (/admin/.test(request.url)) {
            if (request.url === '/admin') {
                filePath = '../admin/admin.html';
			} else {
				filePath = '../' + request.url;
			}			
        }	
		
        extention = path.extname(filePath);
        contentType = types[extention.substr(1, extention.length)];
        sendFile(request, response, contentType, filePath);
    }

}
/* move to helpers*/
function sendFile (request, response, contentType, filePath) {
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
			start(request, response, 'index')
		}
    });
}
/* move to helpers*/

