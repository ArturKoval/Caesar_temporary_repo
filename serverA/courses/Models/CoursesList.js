'use strict';

var db = require('../../Db'),
    assert = require('assert'),
    ObjectId = require('mongodb').ObjectID;

var CoursesList = (function () {
	function CoursesList () {}

	CoursesList.prototype.getCourses = function (request, callback) {
        var answer = [];

        db.connect('courses', function (collection, database) {
            collection.find({}).toArray(function(err, courses) {
                assert.equal(err, null);

                courses.forEach(function (course) {
                    answer.push({
                        id: course._id,
                        city: course.city,
                        teachers: course.teachers,
                        groups: course.groups
                    });
                });

                callback(err, answer);
                database.close();
            });

        });
    }

    CoursesList.prototype.addCourse = function (request, callback) {
        var body = getRequestData(request),
            answer;
        
        request.on('end', function() {
            body = JSON.parse(Buffer.concat(body));

            db.connect('courses', function (collection, database) {
                collection.insert(body, function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        answer = {
                            id: result.ops[0]._id,
                            city: result.ops[0].city,
                            teachers: result.ops[0].teachers,
                            groups: result.ops[0].groups
                        };

                        callback(err, answer);
                        database.close();
                    }
                });
            });
        });
    }

    CoursesList.prototype.editCourse = function (request, callback, action) {
        var body = getRequestData(request);
       
        request.on('end', function() {
            body = JSON.parse(Buffer.concat(body));

            db.connect('courses', function (collection, database) {
                collection.updateOne(
                    {"_id": ObjectId(action)},
                    { $set: { 
                            "city": body.city,
                            "teachers": body.teachers,
                            "groups": body.groups
                        } 
                    }, 
                    function (err, result) {
                        callback(err, action);
                        database.close();
                    }
                );
            });
        });   
    }

    CoursesList.prototype.deleteCourse = function (request, callback, action) {
        db.connect('courses', function (collection, database) {
            collection.remove( {"_id": ObjectId(action)}, function (err, result) {
                callback(err, action);
                database.close();
            }, true);
        });
    }

    function getRequestData (request) {
        var body = [];
        
        request.on('data', function(chunk) {
                body.push(chunk);
            });

        return body;
    }

	return CoursesList;
})();

module.exports = new CoursesList();