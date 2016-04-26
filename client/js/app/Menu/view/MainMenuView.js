'use strict';

(function (This, app) {
    This.MainMenuView = Backbone.View.extend({
        tagName: 'div',
        className: 'MainMenu',
        template: templates.MainMenuTpl,

        events: {
            'mouseleave': 'hide',
            'mouseover': 'show'
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.empty();
            this.$el.html(this.template());
            this.collection.forEach(this.renderOne, this);

            return this;
        },

        renderOne: function (model) {
            this.itemMenu = new This.ItemMenuView({model: model});
            this.$el.find('.containerMainMenu').append(this.itemMenu.render().el);
            this.$itemMenu = $('.itemMenu');
        },
        
        show: function () {
            this.$el.addClass('open');
            this.$itemMenu.addClass('open');
            this.timeBarView = new CS.Messenger.TimeBarView({
                model: new CS.Messenger.Clock()
            });
            $('.flashMessage').html(this.timeBarView.render().el);
        },

        hide: function () {
            this.$el.removeClass('open');
            this.$itemMenu.removeClass('open');
            this.timeBarView.remove();
        }
    });
})(CS.Menu, app);