'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'Students: edit-request': 'showForm',
            'Students: create-request': 'createStudent'
            // 'Students: delete-request': 'delete'
        },

        initialize: function () {
            this.mediator = app.mediator;
        },

        showForm: function (students) {
            this.editStudentListView = new This.EditStudentListView(students);

            this.modal(this.editStudentListView);
        },

        createStudent: function () {
            this.createStudent = new This.CreateStudentView();

            this.modal(this.createStudent);
        },

        delete: function () {
            //....
        }, 

    // helper

        modal: function (view) {
            $('#modal-window').html(view.render().el);
        }
    })
})(CS.Students, app);