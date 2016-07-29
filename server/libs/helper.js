'use strict';

var _ = require('underscore'),
	fs = require('fs');

function Helpers () {}

_.extend(Helpers.prototype, {
	sendFile: function (response, contentType, filePath, request, callback) {
	    fs.stat(filePath, function (err, stats) {
	        if (stats) {
	            fs.readFile(filePath, function(error, data) {
	                if (error) {
	                    response.writeHead(500);
	                    response.end();
	                } else {
	                    response.writeHead(200, {'Content-Type': contentType});
	                    response.write(data);
	                    response.end();
	                }
	            });
	        } else {
	        	if (callback) {
	        		callback(request, response, 'index')
	        	}
			}
	    });
	}
});

module.exports = new Helpers();