'use strict';

var Rotor = require('../../libs/rotor/rotor'),
	Session = require('./Session');

var SessionsList = Rotor.Collection.extend({
	model: Session,
    name: 'sessions'
});

module.exports = new SessionsList();