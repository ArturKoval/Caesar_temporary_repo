'use strict';

(function (This)  {
    This.ErrorPageView = Backbone.View.extend({
        className: 'errorPage',
        tpl: templates.ErrorPageTpl,

        render: function (message) {
            this.$el.html(this.tpl(message));
            
            return this;
        }
    });
})(CS.ErrorPage);