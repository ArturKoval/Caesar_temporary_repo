'use strict';

(function (This) {
    This.GroupList = Backbone.Collection.extend({
        model: This.Group,
        url: '/groups',

        findMyGroups: function (teacher) {
            return new This.GroupList(this.filter(function (group) {
                return group.isMyTeacher(teacher);
            }));
        },

        findGroupsByStage: function (stage) {
            return new This.GroupList(this.filter(function (group) {
                return group.isMyStage(stage);
            }));
        },

        findGroupsByState: function (state) {
            return new This.GroupList(this.filter(function (group) {
                return group.isMyState(state);
            }));
        },

        findGroupsByLocations: function (locations) {
            return new This.GroupList(this.filter(function (group) {
                return group.isMyLocation(locations);
            }));
        },

        findGroupByName: function (name) {
            var res;
            this.forEach(function (group) {
                if (group.get('name') === name) {
                    res = group;
                }
            });
            return res;
        },

        findGroupsNames: function () {
            var groupsNames = [];

            this.forEach(function (group) {
                groupsNames.push(group.get('name'));
            });

            return groupsNames;
        },

        findById: function (id) {
            return this.findWhere({'id': id});
        },

        isNameUnique: function (name) {
            return this.findGroupsNames().indexOf(name) === -1;
        }
    });
})(CS.Groups);
