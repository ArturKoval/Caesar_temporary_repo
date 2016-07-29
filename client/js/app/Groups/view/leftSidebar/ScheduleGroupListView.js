'use strict';
(function (This, app) {
    This.ScheduleGroupListView = This.GroupListView.extend({

        render: function () {
            this.$el.html(templates.groupListScheduleTpl);
            this.$groupList  = this.$el.find('.group-collection');
            this.$myGroups = this.$el.find('.myGroups');
            this.$paginator = this.$el.find('.paginator-place-holder');
            this.createPaginator();
            this.renderGroups();

            return this;
        },

        renderOne: function (group) {
            var smallGroupView = new This.ScheduleSmallGroupView({model: group});
            this.$groupList.append(smallGroupView.render().el);

            return this;
        }
    });
})(CS.Groups, app);
