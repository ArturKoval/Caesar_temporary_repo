'use strict';

var Rotor = require('../../../libs/rotor/rotor'),
	User = require('./User');

var UsersList = Rotor.Collection.extend({
	model: User,
    name: 'users'
});

module.exports = new UsersList();