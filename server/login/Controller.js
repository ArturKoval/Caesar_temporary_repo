'use strict';
var Rotor = require('../libs/rotor/rotor'),
	Users = require('../users/Models/UsersList'),
	Session = require('../sessions/Controller'),
	fs = require('fs');

var Controller = Rotor.Controller.extend({
	user: '',
    responseHead: {
        statusOK: '200',
        statusErr: '401',
        cookies: ''
    },

	initialize: function (request, resp, action, curSession) {
        var reqBody = this.getRequestData(request);

        this.response = resp;
        this.method = this.methods[request.method];
        if (request.url == '/logout') {
        	this.logout(curSession);
        } else {
        	request.on('end', function() {
	            reqBody = JSON.parse(Buffer.concat(reqBody));
	            this.answer = this.auth(reqBody);
	        }.bind(this));
        }
        
    },

	auth: function (data) {
		this.user = Users.findWhere({login: data.login.toLowerCase()});

		if (this.user){
			if (data.password == this.user.get('password')) {
				console.log('ok');
				Session.addSession(function (err, result) {
	                this.responseHead.cookies = 'token=' + result._id;
	                console.log(this.user.get('login'))
					this.sendResponse('', {login: this.user.get('login'), token: result._id});
				}.bind(this), {login: this.user.get('login'), userID: this.user.id});
			} else {
				console.log('bad');
				this.sendResponse('Not valid password');
			}
		} else {
			console.log('bad');
			this.sendResponse('No user with such login');
		}
	},

	logout: function (session) {
		Session.endSession(session, function (err, result) {
			this.responseHead.cookies = '';
			this.sendFile(this.response, 'text/html', '../client/login.html');
		}.bind(this));
	},

	sendFile: function (response, contentType, filePath) {
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

});

module.exports = new Controller();