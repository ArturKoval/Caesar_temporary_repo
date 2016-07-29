'use strict';

(function (This) {
    This.ContributorList = Backbone.Collection.extend({
        model: This.Contributor,
        url: '/contributors',   

        findByDirection: function (direction) {
            return new This.ContributorList(this.filter(function (contributor) {
                return contributor.isDirection(direction);
            }));
        }
    });
})(CS.About);
