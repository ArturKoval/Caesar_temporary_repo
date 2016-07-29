'use strict';

(function (This) {
    This.GroupKeyDatesView = Backbone.View.extend({
        tagName: 'table',

        template: templates.groupKeyDatesViewTpl,

        events: {
            'click tbody td': 'selectKeyDate'
        },

        render: function () {
            this.$el.html(this.template({keyDates: this.model}));

            return this;
        },

        selectKeyDate: function (e) {
            console.log(e.target.innerText);
            // app.mediator.publish('KeyDate selected', e.target.innerText);
        }
    });
})(CS.Groups);