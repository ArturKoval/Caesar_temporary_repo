var http = require('http'),
    path = require('path'),
    fs = require('fs'),
    router = require('./router'),
    mode = process.argv[2];
    collections = {};

http.createServer(start).listen(3000);

console.log('server started...');

function start (request, response) {
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
    if (urlData[0] === 'preload') {
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

collections = {
        'users': [

            {"name": "John Doe",role: "ITA Teacher","location": "Dnipro", "photo": "default-photo.png"},
            {"name": "Dmytro Petin",role: "ITA Coordinator","location": "Dnipro", "photo": "default-photo.png"}
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
            },
             {
              name: 'DP-092-NET',
              location: 'Dnipro',
              budgetOwner: 'SoftServe',
              direction: 'ASP.NET developing',
              startDate: '15.02.2016',
              finishDate: '01.05.2016',
              teachers: ['Dmytro Petin'],
              experts: ['Testman'],
              stage: 'in process'
            },
             {
              name: 'Lv-087-MQC',
              location: 'Lviv',
              budgetOwner: 'SoftServe',
              direction: 'Manual Control Quality Systems',
              startDate: '15.02.2016',
              finishDate: '01.05.2016',
              teachers: ['Oleg Krukchov'],
              experts: ['Testman'],
              stage: 'finished'
            },
            {
              name: 'Rv-091-MQC',
              location: 'Rivne',
              budgetOwner: 'SoftServe',
              direction: 'Manual Control Quality Systems',
              startDate: '15.02.2016',
              finishDate: '01.05.2016',
              teachers: ['Danylo Golubev'],
              experts: ['Testman'],
              stage: 'in process'
            },
             {
              name: 'DP-095-JS',
              location: 'Dnipro',
              budgetOwner: 'SoftServe',
              direction: 'Web UI',
              startDate: '15.02.2016',
              finishDate: '01.05.2016',
              teachers: ['Dmytro Petin'],
              experts: ['Testman'],
              stage: 'planned'
            },
            {
              name: 'DP-065-QC',
              location: 'Dnipro',
              budgetOwner: 'SoftServe',
              direction: 'Manual Control Quality Systems',
              startDate: '15.02.2016',
              finishDate: '01.05.2016',
              teachers: ['Dmytro Petin'],
              experts: ['Testman'],
              stage: 'planned'
            },
            {
              name: 'DP-027-JS',
              location: 'Dnipro',
              budgetOwner: 'SoftServe',
              direction: 'Web UI',
              startDate: '15.02.2016',
              finishDate: '01.05.2016',
              teachers: ['Dmytro Petin'],
              experts: ['Testman'],
              stage: 'planned'
            },
            {
              name: 'DP-035-QC',
              location: 'Dnipro',
              budgetOwner: 'SoftServe',
              direction: 'Manual Control Quality Systems',
              startDate: '15.02.2016',
              finishDate: '01.05.2016',
              teachers: ['Dmytro Petin'],
              experts: ['Testman'],
              stage: 'planned'
            },
            {
              name: 'Lv-084-MQC',
              location: 'Lviv',
              budgetOwner: 'SoftServe',
              direction: 'Manual Control Quality Systems',
              startDate: '15.02.2016',
              finishDate: '01.05.2016',
              teachers: ['Oleg Krukchov'],
              experts: ['Testman'],
              stage: 'finished'
            },
            {
              name: 'Lv-077-MQC',
              location: 'Lviv',
              budgetOwner: 'SoftServe',
              direction: 'Manual Control Quality Systems',
              startDate: '15.02.2016',
              finishDate: '01.05.2016',
              teachers: ['Oleg Krukchov'],
              experts: ['Testman'],
              stage: 'finished'
            },
            {
              name: 'Lv-023a-MQC',
              location: 'Lviv',
              budgetOwner: 'SoftServe',
              direction: 'Manual Control Quality Systems',
              startDate: '15.02.2016',
              finishDate: '01.05.2016',
              teachers: ['Oleg Krukchov'],
              experts: ['Testman'],
              stage: 'finished'
            },

        ]
    };