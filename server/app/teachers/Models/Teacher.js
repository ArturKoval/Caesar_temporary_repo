'use strict';
var Rotor = require('rotor-backbone');

var Teacher = Rotor.Model.extend({
	name: 'teachers',
	defaults: {
        	name: ''
	} ,

});

module.exports = Teacher;