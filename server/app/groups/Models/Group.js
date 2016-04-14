'use strict';
var Rotor = require('../../../libs/rotor/rotor');

var Group = Rotor.Model.extend({
	name: 'groups',
	defaults: {
	name: '',
        location: '',
        budgetOwner: '',
        direction: '',
        startDate: '',
        finishDate: '',
        teachers: [],
        experts: [],
        stage: ''
	} ,

});

module.exports = Group;