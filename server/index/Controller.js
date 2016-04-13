'use strict';

var Rotor = require('../libs/rotor/rotor');

var Controller = Rotor.Controller.extend({
	indexPagePath: '../client/home.html',

	initialize: function (request, response) {
		this.sendFile(response, 'text/html', this.indexPagePath);
	}

});

module.exports = new Controller();