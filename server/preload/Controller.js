'use strict';
var Rotor = require('../libs/rotor/rotor'),
	Users = require('../users/Models/UsersList'),
	Locations = require('../locations/Models/CoursesList'),
	Groups = require('../groups/Models/GroupsList');

var Controller = Rotor.Controller.extend({
    session: {},
    responseHead: {
        statusOK: '200',
        statusErr: '401',
        cookies: ''
    },

	initialize: function (req, resp, action, currSession) {
        var reqBody;

        this.request = req;
        this.response = resp;
        this.session = currSession;
        reqBody = this.getRequestData(this.request);
        this.getPreloadData(this.request);
    },

    getPreloadData: function (request) {
    	var userId = this.session.get('userID'),
    		collections = {
				'users': '',
				'locations': '',
				'groups': ''
			};
            
        if (userId) {
			collections.users = this.getUserData(userId);
			
            Locations.initialize(function (result) {
				collections.locations = this.getLocationsData();
				
				Groups.initialize(function (result) {
					collections.groups = this.getGroupsData();
					this.sendResponse('', collections);      
				}.bind(this));
			}.bind(this));
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

module.exports = new Controller();