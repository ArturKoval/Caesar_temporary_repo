'use strict';

var Rotor = require('rotor-backbone'),
	EnglishLevel = require('./EnglishLevel');

var EnglishLevelsList = Rotor.Collection.extend({
	model: EnglishLevel,
    name: 'englishLevels'
});

module.exports = new EnglishLevelsList();