'use strict';

var Rotor = require('rotor-backbone'),
	Stage = require('./Stage');

var StagesList = Rotor.Collection.extend({
	model: Stage,
    name: 'stages'
});

module.exports = new StagesList();