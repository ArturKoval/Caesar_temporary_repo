'use strict';
(function (This, app) {
    This.LeftSideBarView = Backbone.View.extend({
        tagName: 'div',
        className: 'contributors-menu',

        events: {
            'click .javascript': function () {
                app.mediator.publish('About: selected', 'Development & Research');
                $('.menuAbout').removeClass('chosenDirection');
                $('.javascript').addClass('chosenDirection');

            },
            'click .mqc': function () {
                app.mediator.publish('About: selected', 'Quality Assurance');
                $('.menuAbout').removeClass('chosenDirection');
                $('.mqc').addClass('chosenDirection');
            },
            'click .softserve': function () {
                app.mediator.publish('About: selected', 'Management and Mentoring');
                $('.menuAbout').removeClass('chosenDirection');
                $('.softserve').addClass('chosenDirection');
            },
            'click .other': function () {
                app.mediator.publish('About: selected', 'Additional Thanks');
                $('.menuAbout').removeClass('chosenDirection');
                $('.other').addClass('chosenDirection');
            }
        },

        render: function () {
            this.$el.html(templates.leftSideBarTpl);

            return this;
        }
        
    });
})(CS.About, app);