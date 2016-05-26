'use strict';

var Rotor = require('rotor-backbone'),
	Users = require('../users/Models/UsersList'),
	Session = require('../sessions/Controller');

var Controller = Rotor.Controller.extend({ //как его называть????)
	loginPagePath: '../client/login.html',
	user: '',
    responseHead: {
        statusOK: '200',
        statusErr: '401',
        cookies: ''
    },

	initialize: function (request, resp, action, curSession) {
        var reqBody = this.getRequestData(request);

        this.response = resp;

        if (request.method == 'GET') {
        	if (request.url == '/logout') {
	        	this.logout(curSession);
	        } else {
	        	this.sendFile(this.response, 'text/html', this.loginPagePath);
	        }
        } else {
        	request.on('end', function () {
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
				this.login();
			} else {
				console.log('bad');
				this.sendResponse('Not valid password');
			}
		} else {
			console.log('bad');
			this.sendResponse('No user with such login');
		}
	},
//!!!! обработка ошибок
	logout: function (session) {
		Session.endSession(session, function (err, result) {
			this.responseHead.cookies = 'token=""';
			this.sendFile(this.response, 'text/html', '../client/login.html');
		}, this);
	},
//!!!! обработка ошибок
	login: function () {
		var data = {
			login: this.user.get('login'),
			userID: this.user.id,
			role: this.user.get('role')
		};

		Session.addSession(data, function (err, result) {
            this.responseHead.cookies = 'token=' + result._id;
			this.sendResponse('', {login: this.user.get('login'), token: result._id});
		}, this);
	}

});

module.exports = new Controller();