'use strict';
(function (This, app) {
    This.GroupListView = Backbone.View.extend({
        className: 'group-list-view',
        areMyGroups: false,
        state: 'in-process',

        events: {
            'click .myGroups': 'toggleMyGroups',
            'click #endedGroups': function () {this.selectState('finished')},
            'click #currentGroups': function () {this.selectState('in-process')},
            'click #futureGroups': function () {this.selectState('planned')}
        },

        initialize: function() {
            this.collection.on('change', this.render, this);
        },

        render: function () {
            this.$el.html(templates.groupListTpl);
            this.$groupList  = $('.group-collection');
            this.$myGroups = $('.myGroups');
            this.$paginator = $('.paginator-place-holder');
            app.mediator.publish('GroupsListView: rendered'); //stub, will be deleted with filter update
            this.createPaginator(app.filter.split('groupList'));

            return this;
        },

        createPaginator: function (collection) {
            this.paginatorView = new app.PaginatorView({collection: collection});
            this.$paginator.html(this.paginatorView.el).append(this.paginatorView.render());
        },

        renderGroups: function (collection) {
            app.mediator.publish('Groups: rendered');

            if (collection) {
                collection.forEach(this.renderOne, this);
            }
        },

        renderOne: function (group) {
            var smallGroupView = new This.SmallGroupView({model: group});
            this.$groupList.append(smallGroupView.render().el);

            return this;
        },

        toggleMyGroups: function () {
            this.$myGroups.toggleClass('pressed');
            this.areMyGroups = !this.areMyGroups;
            app.mediator.publish('MyGroups: selected', this.areMyGroups);
            this.paginatorView.remove();
            this.createPaginator(app.filter.split('groupList'));
        },

        selectState: function (state) {
            this.state = state;
            app.mediator.publish('State: selected', this.state);
            this.paginatorView.remove();
            this.createPaginator(app.filter.split('groupList'));
        }
    });
})(CS.Groups, app);