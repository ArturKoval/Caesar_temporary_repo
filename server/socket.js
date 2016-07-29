var WebSocketServer = new require('ws'),
    _ = require('underscore');

function Socket () {}

_.extend(Socket.prototype, {
    users: {},
    webSocketServer: new WebSocketServer.Server({port: 8080}),

    start: function () {
        var id;
        console.log('socket')
        this.webSocketServer.on('connection', function (websocket) {
            id = new Date().getTime();

            this.users[id] = websocket;

            global.mediator.subscribe('Update socket', function (json) {
                for (var user in this.users) {
                    console.log('event fired: ', json)
                    this.users[user].send(JSON.stringify(json));
                }
            }.bind(this));

            websocket.on('close', function() {
                delete this.users[id];
            }.bind(this));
        }.bind(this));
    }
});

module.exports = new Socket();