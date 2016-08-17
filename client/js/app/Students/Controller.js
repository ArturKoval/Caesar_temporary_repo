'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'Students: edit-request': 'showForm'
            // 'Students: delete-request': 'delete'
            // 'Students: create-request': ''
        },

        initialize: function () {
            this.mediator = app.mediator;
        },

        showForm: function (students) {
            var editStudentListView = new This.EditStudentListView(students);

            this.modal(editStudentListView);
        },

        delete: function () {
            //....
        },

        render: function () {

        },   

    // helper

        modal: function (view) {
            $('#modal-window').html(view.render().el);
        }
    })
})(CS.Students, app);