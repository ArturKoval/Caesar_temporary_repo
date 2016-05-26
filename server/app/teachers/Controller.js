'use strict';
var Rotor = require('rotor-backbone');

var Controller = Rotor.Controller.extend({
	collection: require('./Models/TeachersList'),
});

module.exports = new Controller();