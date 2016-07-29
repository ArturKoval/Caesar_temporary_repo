'use strict';

(function (This) {
    This.HintView = Backbone.View.extend({
        tagName: 'div',
        className: 'hint',
        template: templates.hintTpl,

        initialize: function () {
            this.render();
		    setTimeout(this.removeHint.bind(this), 4000);
        },
		
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

	    return this;
	    },

        removeHint: function () {
            this.$el.remove();
            this.model.destroy();
	    }
    });
})(CS.Messenger);