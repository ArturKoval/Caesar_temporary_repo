'use strict';

(function (This) {
    This.GroupListView = Backbone.View.extend({

        userName: 'Dmytro Petin', //hard code
        tagName: 'div',
        className: 'group-list-view',
        template: templates.groupListTpl,
        groupsArray: [], //for navigation we will use arrays of groups (yes - array of arrays), each nested arr contains 10 groups
        areMyGroups: false,
        currentNavPage: 1,
        stage: 'in process',
        lastNavPage: 0,
        shownCollection: 0, // array of groups that is shown
        tmp : [],

        events: {
            'click .search': 'initSearch', //not implemented
            'click .left-nav': 'openPreviousGroupList',
            'click .right-nav': 'openNextGroupList',
            'click .myGroups': 'toggleMyGroups',
            'click .endedGroups': function () {
                this.selectStage('finished')
            },
            'click .currentGroups': function () {
                this.selectStage('in process')
            },
            'click .futureGroups': function () {
                this.selectStage('planned')
            }
        },

        initialize: function () {
            this.$el.append(templates.groupListTpl);
        },

        render: function () {
            $('.group-collection').empty();
            this.groupsArray = this.collection;
            this.groupsArray = this.groupsArray.findGroupsByStage(this.stage);
            this.groupsArray = new This.GroupList(this.groupsArray);

            if (this.areMyGroups) {
                this.groupsArray = this.groupsArray.findMyGroups(this.userName);
            }

            this.checkGroupsAmount();
            if (this.lastNavPage === 0) {
                $('.groups-nav').addClass('hidden');
            } else {
                $('.groups-nav').removeClass('hidden');
            }
            $('.page-nav').html(this.currentNavPage + '   /   ' + this.lastNavPage);    //will be in template
            this.groupsArray[this.shownCollection].forEach(this.renderOne, this);
            return this;
        },

        renderOne: function (group) {
            var groupView = new This.SmallGroupView({model: group});
            $('.group-collection').append(groupView.render().el);
            return this;
        },

        checkGroupsAmount: function () {    //make array of arrays with 10 models inside from all collection;
            var chunk;

            this.tmp = this.groupsArray.slice();
            this.groupsArray = [];
            while (this.tmp.length > 0) {
                chunk = this.tmp.splice(0, 10);
                this.groupsArray.push(chunk);
            }
            this.lastNavPage = this.groupsArray.length;
        },

        openPreviousGroupList: function () {
            this.shownCollection--;
            this.currentNavPage--;
            $('.page-nav').html(this.currentNavPage + ' / ' + this.lastNavPage);
            this.render();
        },

        openNextGroupList: function () {
            this.shownCollection++;
            this.currentNavPage++;
            $('.page-nav').html(this.currentNavPage + '   /   ' + this.lastNavPage);
            this.render();
        },

        toggleMyGroups: function () {
            this.areMyGroups = !this.areMyGroups;
            this.render();
        },

        selectStage: function (stage) {
            this.stage = stage;
            this.render();
        }

    });
})(CS.Groups);