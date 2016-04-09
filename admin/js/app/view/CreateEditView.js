'use strict';
(function (This, app) {
    This.CreateEditView = Backbone.View.extend({
        tpl: templates.crud,
		
		initialize: function () {
			this.model = this.model || new This.Model();              		
        },

        events: {
            'click .change-password': 'changePassword',
            'click .submit': 'submit',
        },

        render: function () {
			this.tpl = this.tpl.build(this.module);
            this.$el.html(this.tpl(this.model.toJSON()));
            if (!this.model.isNew()) {
				this.fillFields();
			}
			
            return this;
        },

		fillFields: function () {
			var fields = map[this.module].fields;
			
			_.forEach(fields, function (type, name) {
				var value = this.model.get(name);
			    this.$el.find('input[name="' + name + '"]').val(value);	
			}, this);
		},
		
        submit: function () {            			
			var fields = map[this.module].fields,
			    attributes = {};
			
			_.forEach(fields, function (type, name) {
				attributes[name] = this.$el.find('input[name="' + name + '"]').val();	
			}, this);

            this.model.set(attributes);
			
			if (this.model.isNew()) {								
				this.model.urlRoot = map[this.module].settings.urlRoot;			    
				this.collection.add(this.model);
		    }
            
			this.model.save();

            this.$el.find('.modal').modal('hide');
        }
    });
})(CSAdmin);