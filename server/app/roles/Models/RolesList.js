'use strict';

var Rotor = require('rotor-backbone'),
	Role = require('./Role');

var RolesList = Rotor.Collection.extend({
	model: Role,
    name: 'roles'
});

module.exports = new RolesList();