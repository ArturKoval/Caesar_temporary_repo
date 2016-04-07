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
        
        findGroupsByLocations: function (locations) {
            return new This.GroupList(this.filter(function (group) {
                return group.isMyLocation(locations);
            }));
        }
    });
})(CS.Groups);
