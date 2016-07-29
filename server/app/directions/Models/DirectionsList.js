'use strict';

var Rotor = require('rotor-backbone'),
	Direction = require('./Direction');

var DirectionsList = Rotor.Collection.extend({
	model: Direction,
    name: 'directions'
});

module.exports = new DirectionsList();