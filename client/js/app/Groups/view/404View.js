'use strict';

(function (This)  {
    This.ErrorPageView = Backbone.View.extend({
        
        tpl: templates.ErrorPageTpl,

        render: function () {
            this.$el.append(this.tpl());

            return this;
        },

        show: function () {
            this.$el.removeClass('hidden');
        }
    });
})(CS.Groups);