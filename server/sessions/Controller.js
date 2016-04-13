'use strict';

var Rotor = require('../libs/rotor/rotor'),
	Users = require('../users/Models/UsersList');

var Session = Rotor.Controller.extend({
	collection: require('./Models/SessionsList'),
	methods: {
        'getSessions': 'getCollection',
        'addSession': 'saveNew',
        'updateSession': 'saveUpdated',
        'endSession': 'deleteItem'
    },

    initialize: function (req) {
        this.request = req;
    },

	checkAuth: function () {
		var token = this.parseCookies(this.request).token,
			session, result;

		if (token) {
			session = this.collection.get(token);

			if (session) {
				result = session;
			} else {
				console.log('reject');
				result = false;
			}
		} else {
			console.log('reject');
			result = false;
		}

		return result;
	},

	//поменять порядок аргументов!!!!!
	addSession: function (callback, data) {
		this.collection.saveNew(callback, data);
	},

	//поменять порядок аргументов!!!!!
	endSession: function (session, callback) {
		//поменять порядок аргументов!!!!!
		this.collection.deleteItem(function (err, result) {
			callback(err, result);
		}, session.get('_id'));
	}
});

module.exports = new Session();
