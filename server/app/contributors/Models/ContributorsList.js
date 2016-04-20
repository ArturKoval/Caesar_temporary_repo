'use strict';

var Rotor = require('../../../libs/rotor/rotor'),
	Contributor = require('./Contributor');

var ContributorsList = Rotor.Collection.extend({
	model: Contributor,
    name: 'contributors'
});

module.exports = new ContributorsList();