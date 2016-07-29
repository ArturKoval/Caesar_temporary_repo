'use strict';

(function (This, app) {
    This.ContentView = Backbone.View.extend({
        template: templates.contentTpl,
        className: 'contentSection',

        render: function () {
            this.$el.html(templates.contentTpl);            
            return this;
        }
    });

})(CS.About, app);