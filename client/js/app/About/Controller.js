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
            this.contentView = new CS.Groups.ContentView(); 
            this.leftSideBarView = new This.LeftSideBarView();
            this.$sidebar.html(this.leftSideBarView.render().$el);
            this.$content.html(this.contentView.render().$el); 
            this.$mainSection = $('.main-section');  
            $('#left-menu').css('display','none');
        },

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
        }    
    });
})(CS.About, app);