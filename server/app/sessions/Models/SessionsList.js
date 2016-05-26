'use strict';

var Rotor = require('rotor-backbone'),
	Session = require('./Session');

var SessionsList = Rotor.Collection.extend({
	model: Session,
    name: 'sessions'
});

module.exports = new SessionsList();