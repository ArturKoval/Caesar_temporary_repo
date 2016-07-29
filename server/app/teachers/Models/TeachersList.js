'use strict';

var Rotor = require('rotor-backbone'),
	Teacher = require('./Teacher');

var TeachersList = Rotor.Collection.extend({
	model: Teacher,
    name: 'teachers'
});

module.exports = new TeachersList();