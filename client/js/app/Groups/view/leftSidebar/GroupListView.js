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
             var $groupCollection = $('.group-collection'),
                $button = $('.myGroups');
            this.$el.html(templates.groupListTpl);
            this.$groupList  = this.$el.find('.group-collection');
            this.$myGroups = this.$el.find('.myGroups');
            this.$paginator = this.$el.find('.paginator-place-holder');
            this.createPaginator();

            console.log(this.collection.findMyGroups(app.user.getShortName()));
            debugger;
            if (app.user.attributes.role == "Teacher") {
                if (this.collection.findMyGroups(app.user.getShortName()).length <= 0) {
                    $button.hide();
                } else {
                    this.renderGroups();
                }
            } else {
                 $button.hide();
            }

            if (app.filter.split('groupList')) {
                $groupCollection.html('');
                app.filter.split('groupList').forEach(this.renderOne, this);
            } else if (!app.filter.split('groupList')) {
                $groupCollection.html('');
                $groupCollection.append('<div class = "no-groups">You have no active groups</div>');
            }
          
            return this;
        },

        createPaginator: function () {
            this.paginatorView = new app.PaginatorView({
                pageSize: 10,
                channel: 'GroupList'
            });

            this.$paginator.html(this.paginatorView.render().el);
        },

        renderGroups: function () {
            // var $groupCollection = $('.group-collection'),
            //     $button = $('.myGroups');
            // debugger;

            // if (app.user.attributes.role !== "Teacher") {
            //     $button.hide();
            // } else if (app.user.attributes.role === "Teacher") {
            //     if (this.collection.findMyGroups(app.user.getShortName()).length <= 0) {
            //         $button.hide();
            //     }
            // }
            app.mediator.publish('Groups: rendered');
            
            // if (app.filter.split('groupList')) {
            //     $groupCollection.html('');
            //     app.filter.split('groupList').forEach(this.renderOne, this);
            // } else if (!app.filter.split('groupList')) {
            //     $groupCollection.html('');
            //     $groupCollection.append('<div class = "no-groups">You have no active groups</div>');
            // }
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
            this.renderGroups();
        },

        selectState: function (state) {
            this.state = state;
            app.mediator.publish('State: selected', this.state);
            this.renderGroups();
        }
    });
})(CS.Groups, app);