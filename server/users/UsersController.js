'use strict';
var Rotor = require('../libs/rotor/rotor');

var UsersController = Rotor.Controller.extend({
	collection: require('./Models/UsersList')
});

module.exports = new UsersController();