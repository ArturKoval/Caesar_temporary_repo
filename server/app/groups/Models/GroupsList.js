'use strict';

var Rotor = require('rotor-backbone'),
	Group = require('./Group');

var GroupsList = Rotor.Collection.extend({
	model: Group,
    name: 'groups'
});

module.exports = new GroupsList();