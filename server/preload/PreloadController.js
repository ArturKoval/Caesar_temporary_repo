'use strict';
var Rotor = require('../libs/rotor/rotor'),
	Users = require('../users/Models/UsersList'),
	Locations = require('../locations/Models/CoursesList'),
	Groups = require('../groups/Models/GroupsList');

var PreloadController = Rotor.Controller.extend({
    responseHead: {
        statusOK: '200',
        statusErr: '300',
        cookies: ''
    },

	initialize: function (req, resp, action) {
        var reqBody;

        this.request = req;
        this.response = resp;
        reqBody = this.getRequestData(this.request);
        this.getPreloadData(this.request);
    },

    getPreloadData: function (request) {
    	var userId = this.parseCookies(request).token,
    		collections;

        if (userId) {
            collections = {
                'users': this.getUserData(userId),
                'locations': this.getLocationsData(),
                'groups': this.getGroupsData()
            };
            this.sendResponse('', collections);      
        } else {
            this.sendResponse('Not authorized');      
        }
		
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

    	return this.formatData(data);
    },

    getGroupsData: function () {
    	var data = Groups.getCollection();

    	return this.formatData(data);
    }
});

module.exports = new PreloadController();