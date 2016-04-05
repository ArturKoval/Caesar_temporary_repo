var http = require('http'),
    path = require('path'),
    fs = require('fs'),
    router = require('./router'),
    mode = process.argv[2];
    flag=false;

http.createServer(start).listen(3000);

console.log('server started...');

function start (request, response) {
    var types = {
            'html': 'text/html',
            'js': 'application/javascript',
            'css': 'text/css',
            'json': 'application/json',
            'ico': 'image/ico',
            'png': 'image/png'
        },
        dir = getDir(),
        contentType,
        extention,
        filePath,
        urlData,
        action,
        route;

    urlData = request.url.substr(1, request.url.length).split('/');
    route = urlData[0];
    action = urlData[1];
    
    if (router.routes[route]){
        router.init(request, response, action, route);
    } else {
        filePath = dir + request.url;

        if (filePath === (dir + '/')) {
            filePath = dir + '/home.html';
        }

        extention = path.extname(filePath);
        contentType = types[extention.substr(1, extention.length)];

        if (urlData[0] !== 'preload') {
            sendFile(response, contentType, filePath);
        }
        
    }
    //* delete this
    var collections = {
        'users': [
            {"name": "Denis", "surname": "Poznukhov"},
            {"name": "Anastacia", "surname": "Sergeeva"},
        ],
        'locations': [
            {"city": "Dnipro"},
            {"city": "Kiev"}
        ],
        'groups': [
            { 
              name: 'DP-093-JS',
              location: 'Dnipro',
              budgetOwner: 'SoftServe',
              direction: 'Web UI',
              startDate: '01.02.2016',
              finishDate: '01.05.2016',
              teachers: ['Dmytro Petin'],
              experts: ['Nodarii'],
              stage: 'in process'
            },
            {
              name: 'DP-094-MQC',
              location: 'Dnipro',
              budgetOwner: 'SoftServe',
              direction: 'Manual Control Quality Systems',
              startDate: '15.02.2016',
              finishDate: '01.05.2016',
              teachers: ['Dmytro Petin'],
              experts: ['Testman'],
              stage: 'in process'
            }
        ]
    };
    if (urlData[0] === 'preload') {
        console.log('!');
        response.writeHead(200, {'Content-Type': contentType});
        response.write(JSON.stringify(collections));
        response.end();
    }
    //*
}

function getDir () {
    var dir;

    if (mode === '-pro') {
        dir = './public';
    } else {
        dir = '../client';
    }

    return dir;
}

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