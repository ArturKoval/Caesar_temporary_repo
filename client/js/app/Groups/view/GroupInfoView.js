'use strict';

(function (This) {
    This.GroupInfoView = Backbone.View.extend({
        tagName: 'div',
        className: 'groupInfoView',

        template: templates.groupInfoViewTpl,

        initialize: function () {
        	this.model.on('change', this.render, this);
        },

        render: function () {
            this.$el.html(this.template(this.model.toClientJSON()));

            return this;
        }
    });
})(CS.Groups);