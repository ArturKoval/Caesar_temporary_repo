'use strict';

var Rotor = require('../../../libs/rotor/rotor'),
	Teacher = require('./Teacher');

var TeachersList = Rotor.Collection.extend({
	model: Teacher,
    name: 'teachers'
});

module.exports = new TeachersList();