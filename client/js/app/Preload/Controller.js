(function (This, app) {

	This.Controller = function Controller () {

		app.mediator.subscribe('Users: loaded', makeTeachers, {}, this);

		this.load = function Constructor () {
			app.infoblock.users = new This.Users();

			app.infoblock.users.teachers = new This.Teachers();

			return this;
		};

		function makeTeachers (collection) {
			collection.each(function (user) {
				if (user.get('role') === 'Teacher') {
					app.infoblock.users.teachers.add(user);
				}
			});
		}

		return this;
	};

})(CS.Storage, app);