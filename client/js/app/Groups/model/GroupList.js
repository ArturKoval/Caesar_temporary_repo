'use strict';

(function (This) {
    This.GroupList = Backbone.Collection.extend({
        model: This.Group,
        url: '/groups',      
    });

})(CS.Groups);
