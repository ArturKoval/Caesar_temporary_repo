'use strict';
var Rotor = require('rotor-backbone');

var Direction = Rotor.Model.extend({
	name: 'directions',
	defaults: {
        	name: ''
	} ,

});

module.exports = Direction;