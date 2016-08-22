'use strict';
var Rotor = require('rotor-backbone'),
    Directions = require('../directions/Models/DirectionsList'),
	Locations = require('../locations/Models/CoursesList'),    
	Groups = require('../groups/Models/GroupsList'),
    Stages = require('../stages/Models/StagesList'),
    Roles = require('../roles/Models/RolesList'),
    Users = require('../users/Models/UsersList'),
    EnglishLevels = require('../englishLevels/Models/EnglishLevelsList'),
    lock = require('../../libs/lock');

var Controller = Rotor.Controller.extend({
    session: {},

    responseHead: {
        statusOK: '200',
        statusErr: '401',
        cookies: ''
    },

    preloadData: {
        users: '',
        locations: '',
        groups: '',        
        roles: '',
        directions: '',
        stages: '',
		englishLevels: ''
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
    	var userId = this.session.get('userID');
            
        if (userId && Users.get(userId)) {
			this.responsePreload(userId);
        } else {
            this.sendResponse('Not authorized');
        }
    },

    responsePreload: function (userId) {
        this.preloadData.users = this.getUserData(userId);

        this.getData(Groups, 'groups');
        this.getData(Locations, 'locations');
        this.getData(Roles, 'roles');
        this.getData(Directions, 'directions');
        this.getData(Stages, 'stages');
        this.getData(EnglishLevels, 'englishLevels');

        /**
            Use this count to fix the number of collections you want to preload
            (syncs collections)
        **/
        lock.reset(6).then(function () {
            this.sendResponse('', this.preloadData);
        }, this);
    },

    getUserData: function (id) {
    	var user = Users.get(id),
    		data;

    	data = user.toJSON();
    	data.id = data._id;

        delete data._id;
        delete data.password;

    	return data;
    },
// error exception ????//
    getData: function (collection, name) {
        collection.initialize(function (result) {
            this.preloadData[name] = this.formatData(collection.getCollection());
            lock.check();
        }, this);
    }
});

module.exports = new Controller();