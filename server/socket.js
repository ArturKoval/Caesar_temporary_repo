var WebSocketServer = new require('ws'),
    mediator = require('./libs/mediator'),
    _ = require('underscore');

function Socket () {}

_.extend(Socket.prototype, {
    users: {},
    webSocketServer: new WebSocketServer.Server({port: 8080}),

    start: function () {
        var id;

        this.webSocketServer.on('connection', function (websocket) {
            id = 'user: ' + Math.floor(Math.random()*(100000000-1)+1);

            this.users[id] = websocket;

            mediator.subscribe('Update socket', function (json) {
                for (var user in this.users) {
                    this.users.send(JSON.stringify(json));
                }
            });

            websocket.on('close', function() {
                delete this.users[id];
            });
        });
    }
});

module.exports = new Socket();