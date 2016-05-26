'use strict';

var Rotor = require('rotor-backbone'),
	User = require('./User');

var UsersList = Rotor.Collection.extend({
	model: User,
    name: 'users'
});

module.exports = new UsersList();