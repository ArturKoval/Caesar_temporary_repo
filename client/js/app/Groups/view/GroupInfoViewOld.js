var GroupInfoView = Backbone.View.extend({
    tagName: 'div',
    className: 'info',

    template: templates.groupInfoViewTpl,

    initialize: function () {
        console.log('GroupInfoView initialized!');
    },
    
    render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

});