'use strict';
var Rotor = require('../libs/rotor/rotor');

var CoursesController = Rotor.Controller.extend({
	collection: require('./Models/CoursesList'),
    get: function () {
        console.log(collection)
    }
});

module.exports = new CoursesController();