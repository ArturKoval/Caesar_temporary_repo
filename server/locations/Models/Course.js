'use strict';
var Rotor = require('../../libs/rotor/rotor');

var Course = Rotor.Model.extend({
	name: 'courses',
	defaults: {
		city: '',
		teachers: '',
		groups: ''
	} ,

});

module.exports = Course;