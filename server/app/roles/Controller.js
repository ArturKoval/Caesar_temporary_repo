'use strict';
var Rotor = require('../../libs/rotor/rotor');

var Controller = Rotor.Controller.extend({
	collection: require('./Models/RolesList'),
});

module.exports = new Controller();