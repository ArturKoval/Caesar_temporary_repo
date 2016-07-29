'use strict';

var Rotor = require('rotor-backbone'),
	Contributor = require('./Contributor');

var ContributorsList = Rotor.Collection.extend({
	model: Contributor,
    name: 'contributors'
});

module.exports = new ContributorsList();