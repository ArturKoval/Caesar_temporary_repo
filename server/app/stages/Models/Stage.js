'use strict';
var Rotor = require('../../../libs/rotor/rotor');

var Stage = Rotor.Model.extend({
	name: 'stages',
	defaults: {
        	name: ''
	} ,

});

module.exports = Stage;