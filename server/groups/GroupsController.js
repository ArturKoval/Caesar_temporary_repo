'use strict';
var Rotor = require('../libs/rotor/rotor');

var GroupsController = Rotor.Controller.extend({
	collection: require('./Models/GroupsList'),
});

module.exports = new GroupsController();