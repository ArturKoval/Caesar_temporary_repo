'use strict';
var Rotor = require('rotor-backbone');

var EnglishLevel = Rotor.Model.extend({
	name: 'englishLevels',
	defaults: {
        name: ''
	}
});

module.exports = EnglishLevel;