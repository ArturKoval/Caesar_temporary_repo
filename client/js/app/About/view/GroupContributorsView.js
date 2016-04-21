'use strict';
(function (This, app) {
    This.GroupContributorsView = Backbone.View.extend({
        tagName: 'div',
        className: 'groupContributors col-md-6 ',

        events: {
            'click .contributorsView': function () {
                app.mediator.publish('About: show-request', this.model);
            }
        },

        render: function () {
            this.$el.html(templates.GroupContributorsTpl(this.model.toJSON()));

            return this;
        }
        
    });
})(CS.About, app);