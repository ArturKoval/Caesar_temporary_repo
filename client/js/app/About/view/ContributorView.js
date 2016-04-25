'use strict';
(function (This, app) {
    This.ContributorView = Backbone.View.extend({
        tagName: 'div',
        className: 'contributor col-md-3',

        events: {
            'mouseover .contributorPhoto': 'showName'
        },

        render: function () {
            this.$el.html(templates.ContributorTpl({photo: this.model.arr[1]}));

            return this;
        },

        showName: function () {
            app.mediator.publish('About: selectedContributor', this.model.arr[0]);
        }  
    });
})(CS.About, app);