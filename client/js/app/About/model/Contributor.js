'use strict';

(function (This) {
    This.Contributor = Backbone.Model.extend({
        urlRoot: '/contributors',
        defaults: function () {
            return {
                nickname: '',
                name: '',
                logo: '',
                direction: '',
                people: '{}',
                photo: '/img/default-photo.png'
            };
        },
        
        isDirection: function (direction) {
            return this.get('direction') === direction; 
        }
    });
})(CS.About);
