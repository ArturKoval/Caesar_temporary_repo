'use strict';

(function (This) {
	This.Student = Backbone.Model.extend({
		defaults: {
			groupId: '',
			name: '',
			lastName: '',
			englishLevel: '',
			CvUrl: '',
			avatar: '',
			entryScore: '',
			approvedBy: ''
		}
	});
})(CS.Students);