'use strict';
var Rotor = require('../../../libs/rotor/rotor');

var Course = Rotor.Model.extend({
	name: 'locations',
	defaults: {
		city: '',
		teachers: '',
		groups: ''
	} ,

});

module.exports = Course;