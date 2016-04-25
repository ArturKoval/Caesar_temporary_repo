'use strict';
(function (This, app) {
    This.ListContributorsView = Backbone.View.extend({
        tagName: 'div',
        className: 'modal-wrapper',

        events: {
            'click .btn-cancel': 'close'
        },

        initialize: function () {
            this.people = this.model.get('people');
            this.contributors = _.pairs(this.people);
        },

        render: function () {
            this.$el.html(templates.ListContributorsViewTpl());
            this.contributors.forEach(this.renderOne, this); 

            return this;
        },

        renderOne: function (arr) {
            this.contributorView = new This.ContributorView({model: {arr: arr}});
            this.$el.find('.photosContainer').append(this.contributorView.render().el);
        },

        close: function () {
            this.remove();
        }
        
    });
})(CS.About, app);