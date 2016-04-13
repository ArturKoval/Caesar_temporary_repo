'use strict';

var _ = require('underscore');

function Lock () {}

_.extend(Lock.prototype, {
	counter: '',
	callback: '',

	reset: function (n) {
		this.counter = n;

		return this;
	},

	check: function () {
		this.counter--;

		if (!this.counter) {
			this.callback();
		}

		return this;
	},

	then: function (callback) {
		this.callback = callback;

		return this;
	}
});

module.exports = new Lock();
