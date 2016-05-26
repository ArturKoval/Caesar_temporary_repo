'use strict';
var Rotor = require('rotor-backbone');

var Controller = Rotor.Controller.extend({
	collection: require('./Models/CoursesList'),
});

module.exports = new Controller();