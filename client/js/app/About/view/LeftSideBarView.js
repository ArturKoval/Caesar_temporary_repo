'use strict';
(function (This, app) {
    This.LeftSideBarView = Backbone.View.extend({
        tagName: 'div',
        className: 'contributors-menu',

        events: {
            'click .javascript': function () {
                app.mediator.publish('About: selected', 'javascript');
            },
            'click .mqc': function () {
                app.mediator.publish('About: selected', 'mqc');
            },
            'click .softserve': function () {
                app.mediator.publish('About: selected', 'softserve');
            },
            'click .other': function () {
                app.mediator.publish('About: selected', 'other');
            }
        },

        render: function () {
            this.$el.html(templates.leftSideBarTpl);

            return this;
        }
        
    });
})(CS.About, app);