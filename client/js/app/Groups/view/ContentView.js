'use strict';

(function (This, app) {
    This.ContentView = Backbone.View.extend({
        el: '#content-section',
    
        initialize: function () {
            if (this.model){
                this.model.on('change', this.render, this);
                this.model.on('destroy', this.close, this);
            }
            app.mediator.subscribe('Locations: selected', this.close.bind(this));
        },

        render: function () {
            var contentLocationView,
                contentGroupNameView,
                contentFooterView;

            contentLocationView = new This.ContentLocationView({
                model: this.model
            });
            this.$el.find('.content-header-location').html(contentLocationView.render().el);

            contentGroupNameView = new This.ContentGroupNameView({
                model: this.model
            });
            this.$el.find('.content-header-group-name').html(contentGroupNameView.render().el);
    
            contentFooterView = new This.ContentFooterView({
                model: this.model
            });
            this.$el.find('.content-footer').empty();
            this.$el.find('.content-footer').append(contentFooterView.render().el);

         return this;
	    },

        close: function () {
            this.$el.find('.content-header-group-name').empty();
            this.$el.find('.content-footer').empty();
        }
    });

})(CS.Groups, app);