'use strict';

(function (This) {
    This.GroupView = Backbone.View.extend({
    	tagName: 'div',
    	className: 'groupView',
        initialize: function () {
        	this.model.on('change', this.render, this);
			this.model.on('destroy', this.remove, this);
        },
        render: function () {
        	this.$el.append(templates.groupTpl());
        	return this;
        }
    });
})(CS.Groups);