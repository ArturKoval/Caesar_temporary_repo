'use strict';

(function (This) {
    This.Group = Backbone.Model.extend({
        urlRoot: '/groups',

        defaults: function () {
            return {
                name: '',
                location: '',
                budgetOwner: '',
                direction: '',
                startDate: '',
                finishDate: '',
                teachers: [],
                experts: [],
                stage: ''
            };
        },

        isMyTeacher: function (teacher) {
            return ((this.get('teachers').indexOf(teacher) > -1));
        },

        isMyStage: function (stage) {
            return (this.get('stage') === stage);
        }
    });
})(CS.Groups);