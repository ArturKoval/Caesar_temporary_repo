'use strict';

var Rotor = require('rotor-backbone'),
	path = require('path'),
	helper = require('../../libs/helper');

var Controller = Rotor.Controller.extend({
	adminPagePath: '../admin/admin.html',
	extention: '',
	contentType: '',
	filePath: '',

	types: {
        'html': 'text/html',
        'js': 'application/javascript',
        'css': 'text/css',
        'json': 'application/json',
        'ico': 'image/ico',
        'png': 'image/png',
        'svg':"image/svg+xml",
        'ttf': "application/x-font-ttf",
        'otf': "application/x-font-opentype",
        'woff': "application/font-woff",
        'woff2': "application/font-woff2",
        'eot': "application/vnd.ms-fontobject"
    },

	initialize: function (request, response) {
        if (request.url === '/admin') {
            this.filePath = this.adminPagePath;
		} else {
			this.filePath = '../' + request.url;
		}

		this.extention = path.extname(this.filePath);
        this.contentType = this.types[this.extention.substr(1, this.extention.length)];
        helper.sendFile(response, this.contentType, this.filePath);	
	}

});

module.exports = new Controller();

