'use strict';
var Rotor = require('rotor-backbone');

var Role = Rotor.Model.extend({
	name: 'roles',
	defaults: {
        	name: ''
	} ,

});

module.exports = Role;