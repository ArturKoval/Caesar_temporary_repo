'use strict';

(function (This) {
    This.KeyDatesView = Backbone.View.extend({
        tagName: 'tr',
        
        template: templates.keyDatesViewTpl,

        render: function () {
            this.$el.html(this.template(this.model))

            return this;
        }
    });
})(CS.Schedule);