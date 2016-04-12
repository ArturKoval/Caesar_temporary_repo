'use strict';

var Rotor = require('../../libs/rotor/rotor'),
	Course = require('./Course');

var CoursesList = Rotor.Collection.extend({
	model: Course,
    name: 'courses'
});

module.exports = new CoursesList();