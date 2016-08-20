'use strict';
var Rotor = require('rotor-backbone');

var Student = Rotor.Model.extend({
	name: 'students',
	defaults: {
		groupId: '',
		name: '',
		lastName: '',
		englishLevel: '',
		CvUrl: '',
		imageUrl: '',
		entryScore: '',
		approvedBy: ''
	} 
});

module.exports = Student;