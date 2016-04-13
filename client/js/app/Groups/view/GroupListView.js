'use strict';

(function (This) {
    This.GroupListView = Backbone.View.extend({
        // userName: app.user.getFullName(), //hard code
        tagName: 'div',
        className: 'group-list-view',
        template: templates.groupListTpl,
        groupsArray: [], //for navigation we will use arrays of groups (yes - array of arrays), each nested arr contains 10 groups
        areMyGroups: false,
        paginatorPage: 1,
        stage: 'in-process',
        lastPaginatorPage: 0,
        shownCollection: 0, // array of groups that is shown
        tmp : [],

        events: {
            'click .search': 'initSearch', //not implemented
            'click .left-nav': 'openPreviousGroupList',
            'click .right-nav': 'openNextGroupList',
            'click .myGroups': 'toggleMyGroups',
            'click .endedGroups': function () {this.selectStage('finished')},
            'click .currentGroups': function () {this.selectStage('in-process')},
            'click .futureGroups': function () {this.selectStage('boarding')}
        },

        initialize: function () {
            this.$el.append(templates.groupListTpl);
        },

        render: function () {

            app.mediator.publish('Groups: cleared');

            this.groupsArray = this.collection;

            this.groupsArray = app.Filter(this.collection, {
                'stage': this.stage,
                'areMyGroups': this.areMyGroups,
                'paginatorPage' : 'curent page'
            });


            this.checkGroupsAmount();

            if (this.lastPaginatorPage <= 1 ) {
                $('.groups-nav').addClass('hidden');
            } else {
                $('.groups-nav').removeClass('hidden');
            }

            $('.page-nav').html(this.paginatorPage + '   /   ' + this.lastPaginatorPage);    //will be in template

            if (this.groupsArray.length) {
                this.groupsArray[this.shownCollection].forEach(this.renderOne, this);
            }

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

            this.lastPaginatorPage = this.groupsArray.length;
        },


        openPreviousGroupList: function () {
            if (this.paginatorPage !== 1) {
                this.shownCollection--;
                this.paginatorPage--;
                $('.page-nav').html(this.paginatorPage + ' / ' + this.lastPaginatorPage);
                this.render();
            }
        },

        openNextGroupList: function () {
            if (this.paginatorPage !== this.lastPaginatorPage) {
                this.shownCollection++;
                this.paginatorPage++;
                $('.page-nav').html(this.paginatorPage + '   /   ' + this.lastPaginatorPage);
                this.render();
            }
        },

        toggleMyGroups: function () {
            $('.myGroups').toggleClass('chosen');
            this.areMyGroups = !this.areMyGroups;
            this.render();
        },

        selectStage: function (stage) {
            this.stage = stage;
            this.render();
        }
    });
})(CS.Groups);

