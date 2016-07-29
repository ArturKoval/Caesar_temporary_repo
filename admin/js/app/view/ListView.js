'use strict';
(function (This, app) {
    This.ListView = Backbone.View.extend({	
        tpl: templates.collection,

        initialize: function () {
            this.listenTo(this.collection, 'add', this.renderOne);
        },

        events: {
            'click #add-new-user': 'addNew'
        },

        render: function () {
			this.tpl = this.tpl.build(this.module);
            this.$el.html(this.tpl());            
			this.$tbody = this.$('tbody');
			this.collection.forEach(this.renderOne, this);					
			
            return this;
        },

        renderOne: function (model) {
            var view = new This.ModelView({model: model});
			view.module = this.module;
            this.$tbody.append(view.render().el);
        },

        addNew: function () {
			app.mediator.publish(this.module + 'create');
        }
    });
})(CSAdmin, app);