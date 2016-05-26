'use strict';
var Rotor = require('rotor-backbone');

var Stage = Rotor.Model.extend({
	name: 'stages',
	defaults: {
        	name: ''
	} ,

});

module.exports = Stage;