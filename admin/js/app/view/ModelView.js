'use strict';
(function (This) {
    This.ModelView = Backbone.View.extend({
        tagName: 'tr',		
        tpl: templates.model,
    
        events: {
            'click .edit': 'editUser',
            'click .delete': 'deleteUser'
        },
		
    	initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);					
        },		

        render: function () {
			var tpl = this.tpl.build(this.module);
            this.$el.html(tpl(this.model.toJSON()));

            return this;
        },

        deleteUser: function () {
            this.model.destroy({wait: true});
        },

        editUser: function () {
            app.mediator.publish(this.module + 'edit', this.model);
        }
    });
    
})(CSAdmin);