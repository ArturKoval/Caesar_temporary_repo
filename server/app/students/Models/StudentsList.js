'use strict';

var Rotor = require('rotor-backbone'),
	Student = require('./Student');

var StudentsList = Rotor.Collection.extend({
	model: Student,
    name: 'students'
});

module.exports = new StudentsList();