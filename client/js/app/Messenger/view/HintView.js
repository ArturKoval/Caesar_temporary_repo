'use strict';

(function (This) {
    This.HintView = Backbone.View.extend({
        tagName: 'div',
        className: 'hint',
	    template: templates.hintTpl,

	    initialize: function () {
	    	this.render();
	    },

	    render: function () {
	    	console.log();
	        this.$el.html(this.template(this.model.toJSON()))
	        return this;
	    },

    });
})(CS.Messenger);