'use strict';

(function (This) {
    This.GroupList = Backbone.Collection.extend({
        model: This.Group,
        url: '/groups',      
        findMyGroups: function (teacher) {
        	var result = [];
        	this.forEach(function (group) {
        		if (group.isMyTeacher(teacher)) {
        			result.push(group);
        		}
        	});
        	return result;
        },
        findGroupsByStage: function (stage) {
        	var result = [];
        	this.forEach(function (group) {
        		if (group.isMyStage(stage)) {
        			result.push(group);
        		}
        	});
        	return result;
        }
    });

})(CS.Groups);
