'use strict';

(function (This) {
    This.EditStudentListView = Backbone.View.extend({
        tagName: 'section',

        className: 'backdrop',

        template: templates.studentListModalViewTpl,

        events: {
            'click .createStudent': 'createStudent',
            'click .downloadCV': 'downloadCV',
            'click .editStudent': 'editStudent',
            'click .deleteStudent': 'deleteStudent',
            'click .exit': 'exit'
        },

        initialize: function (collection) {

        },

        render: function () {
            this.$el.html(this.template(this.model));

            $(document).on('keydown', keyEvent.bind(this));
            function keyEvent (event) {
                if (event.which === System.constants.ESC) {
                    this.exit();
                }
            }

            return this;
        },

        createStudent: function () {
            // this.createStudent = new CreateStudentVeiw();
            // $('#modal-window').html(createStudent.render().el);
            
            alert('I`ll create a Student. I promise:)')
        },

        downloadCV: function () {
            
        },

        editStudent: function () {

        },

        deleteStudent: function () {

        },

        exit: function () {
            $(document).off('keydown');
            $(document).off('click');
            this.remove();
        }
    });
})(CS.Students);