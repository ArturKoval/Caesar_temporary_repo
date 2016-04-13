'use strict';
var Rotor = require('../../libs/rotor/rotor');

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