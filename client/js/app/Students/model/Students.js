'use strict';

(function (This) {
	This.Students = Backbone.Collection.extend({
		model: This.Student,

		url: '/students'
	});
})(CS.Students);