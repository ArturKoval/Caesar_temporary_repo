'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({
      
        subscribes: {
            'About: selected': 'openContentView',
            'About: show-request': 'openListPeopleGroup',
            'About: selectedContributor': 'showNameContributor',
            'Menu: changed-page': 'deleteView',
            'Locations: selected': 'openPageGroup'
        },

        initialize: function () {
            this.mediator = app.mediator;
            this.trigger = true;
            this.$content = $('.content-section');
            this.$sidebar = $('#left-side-bar');
            this.$menuAbout = $('.menuAbout');
            this.$modalWindow = $('#modal-window');
            this.list = new This.ContributorList();
            this.list.fetch();
            this.list.on('sync', function () {
                store.contributors = this.list;     
            }, this);
        },

        showDirectionContributors: function () {
            this.content = new This.ContentView(); 
            this.leftSideBarView = new This.LeftSideBarView();
            this.$sidebar.html(this.leftSideBarView.render().$el);
            this.$content.html(this.content.render().$el); 
            this.$mainSection = $('.main-section');  
            $('#left-menu').css('display','none');
            this.trigger = true;
        },
        //edition
        // app.mediator.subscribe('showDirection', function (direction) {
        //     openContentView(direction);
        // });

        openContentView: function (direction) {
            this.contentView = new This.ContentAboutView({collection: store.contributors.findByDirection(direction)});
            this.$mainSection.html(this.contentView.render().$el);
            this.$menuAbout.removeClass('chosenDirection');    
        }, 

        openListPeopleGroup: function (model) {
            this.listContributorsView = new This.ListContributorsView({model: model});
            this.$modalWindow.append(this.listContributorsView.render().$el);
            this.$contributorsName = $('.contributorsName');
        },

        showNameContributor: function (info) {
            this.$contributorsName.html(info);
        },

        openPageGroup: function () {
            if (this.trigger) {
                app.router.navigate('Groups', {trigger: true});
            }
        },

        deleteView: function () {
            if (this.trigger) {
                this.trigger = false;
                this.content.remove();
                this.leftSideBarView.remove();
            }
        }
        
    });
})(CS.About, app);