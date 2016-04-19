'use strict';
var Rotor = require('../../../libs/rotor/rotor');

var Role = Rotor.Model.extend({
	name: 'roles',
	defaults: {
        	name: ''
	} ,

});

module.exports = Role;