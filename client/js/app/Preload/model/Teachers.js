(function (This) {
	var Teacher = Backbone.Model.extend({
		defaults: {
			name: 'N/A'
		},

		validate: function (attrs) {
			if (!$.trim(attrs.name)) {
				return 'Need to enter the name'
			}
		}
	});

	This.Teachers = Backbone.Collection.extend({
		model: Teacher,

		initialize: function () {
			this.on('add', this.addToInfo, this);
		},

		addToInfo: function (model) {
			let name = model.get('firstName') + " " + model.get('lastName');
			
			System.setInfoBlock(name, 'teachers');
		}
	});

})(CS.Storage);

