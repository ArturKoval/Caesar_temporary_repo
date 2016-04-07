'use strict';

(function (This) {
    This.GroupInfoView = Backbone.View.extend({
        tagName: 'div',
        className: 'groupInfoView',
        template: templates.groupInfoViewTpl,

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
})(CS.Groups, app);