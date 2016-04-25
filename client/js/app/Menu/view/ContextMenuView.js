'use strict';

(function (This, app) {
    This.ContextMenuView = Backbone.View.extend({
        template: templates.contextMenuTpl,

        events: {
            'mouseleave': 'hide',
            'mouseover': 'show',
            'click .addBtn': 'create'
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.empty();
            this.$el.html(this.template());

            return this;
        },
        
        show: function () {
            this.$el.addClass('open');
        },

        hide: function () {
            this.$el.removeClass('open');
        },

        create: function () {
            app.mediator.publish('Groups: create-request', null)
        }
    });
})(CS.Menu, app);