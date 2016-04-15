'use strict';
(function (This, app) {
    This.GroupListView = Backbone.View.extend({
        className: 'group-list-view',
        areMyGroups: false,
        state: 'in-process',

        events: {
            'click .myGroups': 'toggleMyGroups',
            'click .endedGroups': function () {this.selectState('finished')},
            'click .currentGroups': function () {this.selectState('in-process')},
            'click .futureGroups': function () {this.selectState('planned')}
        },

        initialize: function() {
            this.filtered = function(collection) {
                return app.filter(collection, {
                    'state': this.state,
                    'areMyGroups': this.areMyGroups
                });
            };
        },

        render: function () {
            this.$el.html(templates.groupListTpl);
            this.$groupList  = $('.group-collection');
            this.$myGroups = $('.myGroups');
            this.$paginator = $('.paginator-place-holder');
            this.createPaginator(this.filtered(this.collection));

            return this;
        },

        createPaginator: function (collection) {
            this.paginatorView = new app.PaginatorView({collection: collection});
            this.$paginator.html(this.paginatorView.el).append(this.paginatorView.render());
        },

        renderGroups: function (collection) {

            app.mediator.publish('Groups: rendered');
            this.tmp = this.filtered(collection);
			if (this.tmp) {
				this.tmp.forEach(this.renderOne, this);
			}
            
        },

        renderOne: function (group) {
            var smallGroupView = new This.SmallGroupView({model: group});
            this.$groupList.append(smallGroupView.render().el);
            return this;
        },

        toggleMyGroups: function () {
            this.$myGroups.toggleClass('chosen');
            this.areMyGroups = !this.areMyGroups;
            this.paginatorView.remove();
            this.createPaginator(this.filtered(this.collection));
        },

        selectState: function (state) {
            this.state = state;
            this.paginatorView.remove();
            this.createPaginator(this.filtered(this.collection));
        }
    });
})(CS.Groups, app);