'use strict';
var Rotor = require('rotor-backbone');

var Session = Rotor.Model.extend({
	name: 'sessions',
	defaults: {
		token: '',
		login: '',
		role: '',
		userID: ''
	} ,

});

module.exports = Session;