'use strict';
(function (This, app) {
    This.ListContributorsView = Backbone.View.extend({
        tagName: 'div',
        className: 'modal-wrapper',
        documentEl: $(document),
        events: {
            'click .btn-cancel': 'close'
        },

        initialize: function () {
            this.people = this.model.get('people');
            this.contributors = _.pairs(this.people);
             _.bindAll(this, 'onKeyPress');
            this.documentEl.bind('keydown', this.onKeyPress);
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
            this.documentEl.unbind('keydown', this.onKeyPress);
            this.remove();
        },

        onKeyPress: function (e) {
            if (e.keyCode === System.constants.ESC) {
                this.close();
            }
        }
        
    });
})(CS.About, app);