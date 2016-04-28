'use strict';

(function (This, app) {
    This.ContextMenuView = Backbone.View.extend({
        tagName: 'div',
        
        className: 'contextMenu',
        
        template: templates.ContextMenuTpl,

        events: {
            'mouseenter': 'open',
            'mouseleave': 'close',
            'click .create': 'create',
            'click .edit': 'edit',
            'click .delete': 'delete'
        },

        render: function () {
            this.$el.html(this.template());

            return this;
        },

        renderList: function () {
            this.$el.empty();
            this.collection.getVisible().forEach(this.renderOne, this);
        },

        renderOne: function (model) {
            var itemContextMenu = new This.ItemContextMenuView({model: model});
            this.$el.append(itemContextMenu.render().$el);
        },
        
        open: function () {
            this.$el.addClass('open');
            this.renderList();
        },

        close: function () {
            this.$el.removeClass('open');
        },

        create: function () {
            app.mediator.publish('Groups: create-request', null);
            app.mediator.publish('Groups: crud-request', 'create');
        },

        edit: function () {

            app.mediator.publish('Groups: edit-request', this.collection.selectedGroupModel);
            app.mediator.publish('Groups: crud-request', 'edit');

            if(this.collection.context === 'info'){
                app.mediator.publish('Groups: edit-request', this.collection.selectedGroupModel);
            } else if(this.collection.context === 'schedule'){
                //action for calendar editing
            }

        },

        delete: function () {
            app.mediator.publish('Groups: delete-request', this.collection.selectedGroupModel);
            app.mediator.publish('Groups: crud-request', 'delete');
        }
    });
})(CS.Menu, app);