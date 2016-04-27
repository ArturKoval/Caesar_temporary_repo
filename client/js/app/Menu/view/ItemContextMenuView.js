'use strict';

(function (This, app) {
    This.ItemContextMenuView = Backbone.View.extend({
        tagName: 'div',

        className: 'itemContextMenu',

        template: templates.ItemContextMenuTpl,

        render: function () {
            this.$el.html(templates.ItemContextMenuTpl(this.model.toJSON()));

            return this;
        }
    });
})(CS.Menu, app);
