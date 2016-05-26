'use strict';

var Rotor = require('rotor-backbone'),
	Course = require('./Course');

var CoursesList = Rotor.Collection.extend({
	model: Course,
    name: 'locations'
});

module.exports = new CoursesList();