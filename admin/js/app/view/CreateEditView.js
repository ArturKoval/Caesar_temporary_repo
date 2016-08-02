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
			    
                if (type === '') {				    
					this.$el.find('input[name="' + name + '"]').val(value);	
				} else {
				    if (type.control === 'select') {
				        this.$el.find('select[name="' + name + '"] option[value="' + value +'"]').attr('selected', 'selected');							
				    }
					
				    if (type.control === 'date') {
						var date = moment(value, 'X').format('YYYY-MM-DD');

						this.$el.find('input[name="' + name + '"]').val(value);	
						this.$el.find('input[name="' + name + '"]').val(date);	
				    }				
					
					if (type.control === 'array') {
				       this.$el.find('textarea[name="' + name + '"]').val(value.join('; '));						
				    }
					
				    if (type.control === 'bool') {
						value && this.$el.find('input[name="' + name + '"]').prop('checked', true);	
				    }
				}				
			}, this);
		},
		
        submit: function () {            			
			var fields = map[this.module].fields,
			    attributes = {};
			
			this.scanFields(fields, attributes);
            this.model.set(attributes);
			
			if (this.model.isNew()) {								
				this.model.urlRoot = map[this.module].settings.urlRoot;			    
				this.collection.add(this.model);
		    }
            
			this.model.save();

            this.$el.find('.modal').modal('hide');
        },
		
		scanFields: function (fields, attributes) {
			_.forEach(fields, function (type, name) {
				if (type === '') {
				    attributes[name] = this.$el.find('input[name="' + name + '"]').val();	
				} else {
				    if (type.control === 'select') {
				        attributes[name] = this.$el.find('select[name="' + name + '"] option:selected').val();	
				    }
					
				    if (type.control === 'date') {
						var date = this.$el.find('input[name="' + name + '"]').val();
						
				        attributes[name] = this.$el.find('input[name="' + name + '"]').val();	
						attributes[name] = moment(date).format('X');
				    }				
					
					if (type.control === 'array') {
				        attributes[name] = this.$el.find('textarea[name="' + name + '"]').val().split(';');	
				    }
					
				    if (type.control === 'bool') {
				        attributes[name] = this.$el.find('input[name="' + name + '"]:checked').val();	
				    }
				}
			}, this);
		}
    });
})(CSAdmin);