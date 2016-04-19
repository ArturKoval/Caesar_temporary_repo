'use strict';
var Rotor = require('../../libs/rotor/rotor'),
    Directions = require('../directions/Models/DirectionsList'),
	Locations = require('../locations/Models/CoursesList'),
    Teachers = require('../teachers/Models/TeachersList'),
	Groups = require('../groups/Models/GroupsList'),
    Stages = require('../stages/Models/StagesList'),
    Roles = require('../roles/Models/RolesList'),
    Users = require('../users/Models/UsersList'),
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
        teachers: '',
        roles: '',
        directions: '',
        stages: ''
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

    getUserData: function (id) {
    	var user = Users.get(id),
    		data;

    	data = user.toJSON();
    	data.id = data._id;

        delete data._id;
        delete data.password;

    	return data;
    },
//обработка ошибок
    getLocationsData: function () {
        Locations.initialize(function (result) {
            this.preloadData.locations = this.formatData(Locations.getCollection());
            lock.check();
        }, this);
    },
//обработка ошибок
    getGroupsData: function () {
    	Groups.initialize(function (result) {
            this.preloadData.groups = this.formatData(Groups.getCollection());
            lock.check();
        }, this);
    },

    getData: function (collection, name) {
        collection.initialize(function (result) {
            this.preloadData[name] = this.formatData(collection.getCollection());
            lock.check();
        }, this);
    },

    responsePreload: function (userId) {
        this.preloadData.users = this.getUserData(userId);

        this.getData(Groups, 'groups');
        this.getData(Locations, 'locations');
        this.getData(Teachers, 'teachers');
        this.getData(Roles, 'roles');
        this.getData(Directions, 'directions');
        this.getData(Stages, 'stages');

        lock.reset(6).then(function () {
            this.sendResponse('', this.preloadData);
        }, this);
    }
});

module.exports = new Controller();