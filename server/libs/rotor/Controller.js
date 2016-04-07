'use strict';
var _ = require('underscore');

function Controller () {}

Controller.extend = function (protoProps, staticProps) {
    var parent = this,
        child;

    if (protoProps && _.has(protoProps, 'constructor')) {
        child = protoProps.constructor;
    } else {
        child = function () {
            return parent.apply(this, arguments);
        };
    }

    _.extend(child, parent, staticProps);

    var Surrogate = function () {
        this.constructor = child;
    };
    
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    if (protoProps) _.extend(child.prototype, protoProps);

    child.__super__ = parent.prototype;

    return child;
};  

_.extend(Controller.prototype, {
    methods: {
        'GET': 'getCollection',
        'POST': 'saveNew',
        'PUT': 'saveUpdated',
        'DELETE': 'deleteItem'
    },
    response: '',
    method: '',
    answer: '',
    collection: '',
    initialize: function (request, resp, action) {
        var reqBody = this.getRequestData(request);

        this.response = resp;
        this.method = this.methods[request.method];

        if (request.method == 'POST' || request.method == 'PUT') {
            request.on('end', function() {
                reqBody = JSON.parse(Buffer.concat(reqBody));
                delete reqBody['id'];
                this.answer = this.collection[this.method](this.sendResponse.bind(this), reqBody, action);
            }.bind(this));
        } else {
            this.answer = this.collection[this.method](this.sendResponse.bind(this), action);
        }
        
    },

    sendResponse: function (err, data) {
        if (err) {
            console.log(err);
            this.response.writeHead(500);
            this.response.end();
        } else {
            this.response.writeHead(200, {'Content-Type': 'application/json'});
            this.response.write(JSON.stringify(this.formatData(data)));
            this.response.end();
        }
    },

    formatData: function (data) {
        var result = [];

        if (Array.isArray(data)) {
            data.forEach(function (item) {
                item.id = item._id;
                result.push(item);
            });
        } else {
            data.id = data._id;
            result = data;
        }

        return result;
    },

    getRequestData: function (request) {
        var body = [];
    
        request.on('data', function(chunk) {
                body.push(chunk);
            });

        return body;
    },
});

module.exports = Controller;