'use strict';
var Rotor = require('../libs/rotor/rotor'),
	Users = require('../users/Models/UsersList');

var Login = Rotor.Controller.extend({
	user: '',

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
		this.user = Users.findWhere({login: data.login});

		if (this.user){
			if (data.password == this.user.get('password')) {
				console.log('ok');
				this.sendResponse('', {login: this.user.login, token: this.user.get('_id')});
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
            this.response.writeHead(401);
            this.response.write(err);
            this.response.end();
        } else {
            this.response.writeHead(200, {
            	'Set-Cookie': 'token=' + data.token,
            	//'Location': 'http://localhost:3000',
            	'Content-Type': 'application/json'
            });
            this.response.write(JSON.stringify(this.formatData(data)));
            this.response.end();
        }
    },
});

module.exports = new Login();