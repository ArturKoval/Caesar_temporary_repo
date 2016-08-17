'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'Students: edit-request': 'showForm',
            'Students: create-request': 'createForm'
            // 'Students: delete-request': 'delete'
        },

        initialize: function () {
            this.mediator = app.mediator;
        },

        showForm: function (students) {
            var editStudentListView = new This.EditStudentListView(students);

            this.modal(editStudentListView);
        },

        createForm: function () {
            this.createStudent = new This.CreateStudentView();

            this.modal(this.createStudent);
        },

        delete: function () {
            //....
        }, 

        start: function (locations) {
            this.trigger = true;
            app.mediator.publish('Locations: selected', locations);
            $('#left-menu').css('display', 'block');
        },

    // helper

        modal: function (view) {
            $('#modal-window').html(view.render().el);
        }
    })
})(CS.Students, app);