'use strict';
var Rotor = require('../libs/rotor/rotor');

var CoursesController = Rotor.Controller.extend({
	users: {
		john: {
	       	login: 'john',
	       	firstName: "John",
	        lastName: "Doe",
	        role: "ITA Teacher",
	        location: "Dnipro",
	        photo: "/default-photo.png",
	        password: '1234'

	    }, 
	    dmytro: {
	    	login: 'dmytro',
	        firstName: "Dmytro",
	        lastName: "Petin",
	        role: "ITA Coordinator",
	        location: "Dnipro",
	        photo: "/default-photo.png",
	        password: '1234'
	    }
	},

	initialize: function (request, resp, action) {
        var reqBody = this.getRequestData(request);

        this.response = resp;
        this.method = this.methods[request.method];
        request.on('end', function() {
            reqBody = JSON.parse(Buffer.concat(reqBody));
            this.answer = this.auth(reqBody);
        }.bind(this));
    },

	auth: function (data) {
		if (this.users[data.login]){
			if (data.password == this.users[data.login]['password']) {
				console.log('ok');
				this.sendResponse('', {login:this.users[data.login], token: new Date().getTime()});
			} else {
				console.log('bad');
				this.sendResponse('Not valid password');
			}
		} else {
			console.log('bad');
			this.sendResponse('No user with such login');
		}
		
	},

	sendResponse: function (err, data) {
        if (err) {
            console.log(err);
            this.response.writeHead(400);
            this.response.write(err);
            this.response.end();
        } else {
            this.response.writeHead(200, {
            	'Set-Cookie': 'token=' + data.token,
            	'Location': 'http://localhost:3000/',
            	'Content-Type': 'application/json'
            });
            this.response.write(JSON.stringify(this.formatData(data)));
            this.response.end();
        }
    },
});

module.exports = new CoursesController();