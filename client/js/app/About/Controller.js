'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'About: selected': 'openContentView',
            'About: show-request': 'openListPeopleGroup',
            'About: selectedContributor': 'showNameContributor'
        },

        initialize: function () {
            this.mediator = app.mediator;
            this.leftSideBarView = new This.LeftSideBarView();
        },

        showDirectionContributors: function () {
            var $sidebar = $('#left-side-bar');

            $sidebar.html(this.leftSideBarView.render().$el);
        },

        openContentView: function (direction) {
            this.list = new This.ContributorList();
            this.list.fetch();
            this.list.on('sync', function () {
                store.contributors = this.list;
                this.contentView = new This.ContentAboutView({collection: store.contributors.findByDirection(direction)});
                $('#main-section').html(this.contentView.render().$el);
            }, this);
            
            $('.menuAbout').removeClass('chosenDirection');
            $('.' + direction).addClass('chosenDirection');
        }, 

        openListPeopleGroup: function (model) {
            this.listContributorsView = new This.ListContributorsView({model: model});
            $('#modal-window').append(this.listContributorsView.render().$el);
        },

        showNameContributor: function (info) {
            $('.contributorsName').html(info)
        }
        
    });
})(CS.About, app);