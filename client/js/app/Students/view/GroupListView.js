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
            this.collection.on('change', this.renderGroups, this);
            this.collection.on('update', this.renderGroups, this);
        },

        render: function () {            
            if (app.user.attributes.role == "Teacher" && this.collection.findMyGroups(app.user.getShortName()).length > 0) {
                this.$el.html(templates.groupListTpl);
            } else {
                this.$el.html(templates.groupListTplNoGroups);
            }
            this.$groupList  = this.$el.find('.group-collection');
            this.$myGroups = this.$el.find('.myGroups');
            this.$paginator = this.$el.find('.paginator-place-holder');
            this.createPaginator();
            this.renderGroups();

            return this;
        },

        createPaginator: function () {
            this.paginatorView = new app.PaginatorView({
                pageSize: 8,
                channel: 'GroupList'
            });

            this.$paginator.html(this.paginatorView.render().el);
        },

        renderGroups: function () {
            var $groupCollection = $('.group-collection');

            app.mediator.publish('Students: rendered');
            if (app.filter.split('groupList')) {
                console.log(123);
                $groupCollection.html('');
                app.filter.split('groupList').forEach(this.renderOne, this);
            } else {
                $groupCollection.html('');
                $groupCollection.append('<div class = "no-groups">There are no active groups in this area</div>');
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
            app.mediator.publish('MyGroups Students: selected', this.areMyGroups);
            this.renderGroups();
        },

        selectState: function (state) {
            this.state = state;
            app.mediator.publish('State: selected', this.state);
            this.renderGroups();
        }
    });
})(CS.Students, app);
