'use strict';
(function (This, app) {
    This.GroupContributorsView = Backbone.View.extend({
        tagName: 'div',
        className: 'groupContributors col-md-6 ',

        events: {
            'click .contributorsView': 'showGroupContributors',
            'mouseover .contributorsView': 'showInfoGroup',
            'mouseout .contributorsView': 'cleanContainers'
        },

        initialize: function () {
            this.$contentHeader = $('.content-header-group-name');
            this.$stageView = $('.stageView');
        },

        render: function () {
            this.$el.html(templates.GroupContributorsTpl(this.model.toJSON()));

            return this;
        },

        showInfoGroup: function () {
            this.$contentHeader.html('<p class = "groupLocation">' + this.model.get('direction') + '</p>');
            this.$stageView.html('<p class = "groupStageTitle">' + this.model.get('name') + '</p>');
        },

        showGroupContributors: function () {
            app.mediator.publish('About: show-request', this.model);
        },

        cleanContainers: function () {
            this.$contentHeader.html('');
            this.$stageView.html('');
        }
        
    });
})(CS.About, app);