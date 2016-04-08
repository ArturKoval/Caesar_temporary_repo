'use strict';
var Rotor = require('../libs/rotor/rotor'),
	Users = require('../users/Models/UsersList'),
	Locations = require('../locations/Models/CoursesList'),
	Groups = require('../groups/Models/GroupsList');

var PreloadController = Rotor.Controller.extend({
	initialize: function (request, resp, action) {
        var reqBody = this.getRequestData(request);

        this.response = resp;
        this.sendResponse('', this.getPreloadData(request));  
    },

    getPreloadData: function (request) {
    	var userId = this.parseCookies(request).token,
    		collections;

		collections = {
		    'users': this.getUserData(userId),
		    'locations': this.getLocationsData(),
		    'groups': this.getGroupsData()
		};
		
		return collections;
    },

    getUserData: function (id) {
    	var user = Users.get(id),
    		data;

    	data = user.toJSON();
    	data.id = data._id;

    	return data;
    },

    getLocationsData: function () {
    	var data = Locations.getCollection();

    	return data;
    },

    getGroupsData: function () {
    	var data = Groups.getCollection();

    	return data;
    }
});

module.exports = new PreloadController();