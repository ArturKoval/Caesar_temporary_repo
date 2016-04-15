'use strict';

(function (This)  {
    This.ErrorPageViewMain = Backbone.View.extend({
        className: 'modal-wrapper',
        tpl: templates.ErrorPageMainTpl,

        render: function () {
            this.$el.html(this.tpl());
            
            return this;
        }
    });
})(CS.ErrorPage);