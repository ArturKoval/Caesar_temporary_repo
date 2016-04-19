'use strict';

var Rotor = require('../../../libs/rotor/rotor'),
	Stage = require('./Stage');

var StagesList = Rotor.Collection.extend({
	model: Stage,
    name: 'stages'
});

module.exports = new StagesList();