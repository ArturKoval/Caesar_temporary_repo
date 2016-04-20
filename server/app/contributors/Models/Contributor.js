'use strict';
var Rotor = require('../../../libs/rotor/rotor');

var Contributor = Rotor.Model.extend({
	name: 'contributors',
	defaults: {
    	nickname: '',
	    name: '',
	    logo: '',
	    direction: '',
	    people: {}
	} ,

});

module.exports = Contributor;