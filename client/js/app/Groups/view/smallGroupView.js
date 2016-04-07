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
            this.model.on('destroy', this.remove, this);
        },

        render: function () {
            this.$el.append(this.model.get('name'));
            
            return this;
        },

        chooseGroup: function () {
            app.mediator.publish('groups: group selected', this.model);
            $('.small-group-view').removeClass('chosen');
            this.$el.addClass('chosen');
        }
    });
})(CS.Groups);