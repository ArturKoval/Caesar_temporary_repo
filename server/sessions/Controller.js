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
			session;

		if (token) {
			session = this.collection.get(token);
			if (session) {
				return session;
			} else {
				console.log('reject')
				return false;
			}
		} else {
			console.log('reject')
			return false;
		}
	},

	addSession: function (callback, data) {
		this.collection.saveNew(callback, data);
	},

	endSession: function (session, callback) {
		this.collection.deleteItem(function (err, result) {
			callback(err, result);
		}, session.get('_id'));
	}
});

module.exports = new Session();
