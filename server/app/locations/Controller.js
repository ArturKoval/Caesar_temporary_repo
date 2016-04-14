'use strict';
var Rotor = require('../../libs/rotor/rotor');

var Controller = Rotor.Controller.extend({
	collection: require('./Models/CoursesList'),
});

module.exports = new Controller();