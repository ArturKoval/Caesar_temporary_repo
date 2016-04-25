'use strict';

(function (This, app) {
    This.KeyDateView = Backbone.View.extend({
        tagName: 'td',

        events: {
            'click': 'showKeyDateWeek'
        },

        render: function () {
            this.$el.html(this.model);

            return this;
        },

        showKeyDateWeek: function () {
        }
    });

})(CS.Schedule, app);