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
            //app.mediator.publish('Key date selected');
            console.log('You selected: ' + this.model);
        }
    });

})(CS.Schedule, app);