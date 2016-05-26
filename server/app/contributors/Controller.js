'use strict';
var Rotor = require('rotor-backbone');

var Controller = Rotor.Controller.extend({
	collection: require('./Models/ContributorsList'),
});

module.exports = new Controller();