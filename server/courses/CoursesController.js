'use strict';

var CoursesController = (function () {
	var method,
		answer,
		response;

	function CoursesController () {
		this.courses = require('./Models/CoursesList');
		this.methods = {
			'GET': 'getCourses',
            'POST': 'addCourse',
            'PUT': 'editCourse',
            'DELETE': 'deleteCourse'
		};
	}

	CoursesController.prototype.init = function (request, resp, action) {
		response = resp;
        method = this.methods[request.method];
        answer = this.courses[method](request, sendResponse, action);
    }

    function sendResponse (err, data) {
    	if (err) {
            console.log(err);
            response.writeHead(500);
            response.end();
        } else {
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.write(JSON.stringify(data));
            response.end();
        }
    }

	return CoursesController;
})();

module.exports = new CoursesController();