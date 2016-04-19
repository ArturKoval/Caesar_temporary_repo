'use strict';
var Rotor = require('../../../libs/rotor/rotor');

var Direction = Rotor.Model.extend({
	name: 'directions',
	defaults: {
        	name: ''
	} ,

});

module.exports = Direction;