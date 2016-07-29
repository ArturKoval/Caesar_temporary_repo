'use strict';
var Rotor = require('rotor-backbone');

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