'use strict';

var Rotor = require('../../../libs/rotor/rotor'),
	Course = require('./Course');

var CoursesList = Rotor.Collection.extend({
	model: Course,
    name: 'locations'
});

module.exports = new CoursesList();