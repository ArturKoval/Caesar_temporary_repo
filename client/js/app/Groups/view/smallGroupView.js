'use strict';

(function (This) {
    This.SmallGroupView = Backbone.View.extend({
        tagName: 'div',
        className: 'small-group-view col-md-6',
        events: {
            'click': 'chooseGroup'
        },

        initialize: function () {
            this.model.on('change', this.render, this);
            this.model.on('add', this.render, this);
            this.model.on('destroy', this.remove, this);
            app.mediator.subscribe('Groups: cleared', this.clear.bind(this));
        },

        render: function () {
            this.$el.html(this.model.get('name'));

            return this;
        },

        chooseGroup: function () {
            app.mediator.publish('Groups: group selected', this.model);
            $('.small-group-view').removeClass('chosen');
            this.$el.addClass('chosen');
        },

        clear: function() {
            this.remove();
        }
    });
})(CS.Groups);