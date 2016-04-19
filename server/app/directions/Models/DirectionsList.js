'use strict';

var Rotor = require('../../../libs/rotor/rotor'),
	Direction = require('./Direction');

var DirectionsList = Rotor.Collection.extend({
	model: Direction,
    name: 'directions'
});

module.exports = new DirectionsList();