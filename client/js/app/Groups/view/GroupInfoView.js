'use strict';

(function (This) {
    This.GroupInfoView = Backbone.View.extend({
        tagName: 'div',
        className: 'info',
        template: templates.groupInfoViewTpl,
        events: {
            'contextmenu': 'showContextMenu',
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            
            return this;
        },
        
        showContextMenu: function () {
            var contextMenu = new app.ContextMenu({
                model: this.model
            });

            this.$el.append(contextMenu.render().el);
        }
    });
})(CS.Groups, app);