'use strict';

(function (This) {
    This.GroupInfoView = Backbone.View.extend({
        tagName: 'div',
        className: 'info',
        
        events: {
            'contextmenu': 'showContextMenu',
        },
    
        template: templates.groupInfoViewTpl,
    
        initialize: function () {
            console.log('GroupInfoView initialized!');
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