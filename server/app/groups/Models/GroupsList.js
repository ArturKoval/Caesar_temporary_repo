'use strict';

var Rotor = require('../../../libs/rotor/rotor'),
	Group = require('./Group');

var GroupsList = Rotor.Collection.extend({
	model: Group,
    name: 'groups'
});

module.exports = new GroupsList();