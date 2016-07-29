'use strict';

var Rotor = require('rotor-backbone'),
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

	//поменять порядок аргументов!!!!! обработка ошибки
	addSession: function (data, callback, context) {
		this.collection.saveNew(data, '', callback, context);
	},

	//поменять порядок аргументов!!!!!обработка ошибки
	endSession: function (session, callback, context) {
		//поменять порядок аргументов!!!!!
		this.collection.deleteItem(session.get('_id'), function (err, result) {
			callback.call(context, err, result);
		});
	}
});

module.exports = new Session();
