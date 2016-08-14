'use strict';

(function (This) {
	This.Student = Backbone.Model.Extend({
		defaults: {
			groupId: '',
			name: '',
			lastName: '',
			englishLevel: '',
			CvUrl: '',
			imageUrl: '',
			entryScore: '',
			approvedBy: ''
		}
	});
})(CS.Students);