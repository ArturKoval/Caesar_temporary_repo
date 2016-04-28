'use strict';

(function (This, app) {
    This.SmallGroupView = Backbone.View.extend({
        className: 'small-group-view col-md-6',
        tagName: 'div',
        multiSelection: false,
        events: {
            'click': 'select'
        },

        initialize: function () {
            app.mediator.subscribe('Groups: rendered', this.remove, {}, this);
            app.mediator.subscribe('Groups: the only selected', this.deselect, {}, this);
            app.mediator.subscribe('Groups: multiSelect mode on', function() {this.multiSelection = true;});
            app.mediator.subscribe('Groups: multiSelect mode off', function() {this.multiSelection = false;});
        },

        render: function () {
            this.$el.html(templates.smallGroupTpl(this.model.toJSON()));
            return this;
        },

        select: function () {
            if(this.multiSelection) {
                this.multiSelect();
            } else {
                app.mediator.publish('Groups: the only selected', this.model);
                app.mediator.publish('Groups: selected', this.model);
                this.$el.addClass('chosen');
            }
        },

        deselect: function() {
            if (this.$el.hasClass('chosen')) {
                this.$el.removeClass('chosen');
            }
        },

        multiSelect: function() {
            if (this.$el.hasClass('chosen')) {
                this.$el.removeClass('chosen');
            } else {
                this.$el.addClass('chosen');
            }
            app.mediator.publish('Groups: selected', this.model);
        }
    });
})(CS.Groups, app);