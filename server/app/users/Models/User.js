'use strict';
var Rotor = require('rotor-backbone');

var User = Rotor.Model.extend({
	name: 'users',
	defaults: {
		firstName: '',
		lastName: '',
		role: '',
		location: '',
		photo: "/default-photo.png"
	} ,

});

module.exports = User;