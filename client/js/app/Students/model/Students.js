'use strict';

(function (This) {
	This.Students = Backbone.Collection.Extend({
		model: This.Student,

		url: '/students'
	});
})(CS.Students);