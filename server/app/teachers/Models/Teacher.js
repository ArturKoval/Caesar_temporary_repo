'use strict';
var Rotor = require('../../../libs/rotor/rotor');

var Teacher = Rotor.Model.extend({
	name: 'teachers',
	defaults: {
        	name: ''
	} ,

});

module.exports = Teacher;