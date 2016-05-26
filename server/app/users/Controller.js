'use strict';
var Rotor = require('rotor-backbone');

var Controller = Rotor.Controller.extend({
	collection: require('./Models/UsersList')
});

module.exports = new Controller();