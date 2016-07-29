'use strict';

var _ = require('underscore');

function Lock () {}

_.extend(Lock.prototype, {
	counter: '',
	callback: '',
	context: '',

	reset: function (n) {
		this.counter = n;

		return this;
	},

	check: function () {
		if (!(--this.counter)) {
			this.callback.call(this.context);
		}

		return this;
	},

	then: function (callback, context) {
		this.callback = callback;
		this.context = context;

		return this;
	}
});

module.exports = new Lock();
