(function (This, app) {
	var User = Backbone.Model.extend({
		defaults: {
			firstName: 'Unnamed',
			lastName: 'N/A',
			location: 'N/A',
			login: 'N/A',
			name: 'N/A',
			password: '*',
			photo: 'N/A',
			role: 'Guest'
		}
	});

	This.Users = Backbone.Collection.extend({
		model: User,

		initialize: function () {
			var fetchOptions = {
                success: function (collection) {
                	app.mediator.publish('Users: loaded', collection);
                },

                reset: true
            };

        	this.fetch(fetchOptions);
		},

		url: '/users'
	});

})(CS.Storage, app);