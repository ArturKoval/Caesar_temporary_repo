'use strict';
var Rotor = require('../libs/rotor/rotor');

var Controller = Rotor.Controller.extend({
	collection: require('./Models/GroupsList'),
});

module.exports = new Controller();