'use strict';

(function (This, app) {
    This.EditStudentListView = Backbone.View.extend({
        tagName: 'section',

        className: 'backdrop',

        template: templates.studentListModalViewTpl,

        events: {
            'click .createStudent': 'createStudent',
            'click .downloadCV': 'downloadCV',
            'click .modal_editStudentlist': 'editStudent',
            'click .deleteStudent': 'deleteStudent',
            'click .exit': 'exit',
        },
        


        initialize: function (collection) {
            this.mediator = app.mediator;
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
            this.mediator.publish('Students: create-request', this.model);
        },

        downloadCV: function () {
            
        },

        editStudent: function (event) {
            var eventCLasses = event.target.className; 

            if (eventCLasses.indexOf('editStudent') != -1) {
                var choosenStudent = event.target.parentElement.parentElement,
                    name = choosenStudent.querySelector('.name').value,
                    englishLevel = choosenStudent.querySelector('.english-level').value,
                    studentData;

                debugger;   
                // can't get value 
                studentData = {
                    name: name,
                    englishLevel: englishLevel
                };

                this.mediator.publish('Students: edit request', studentData);
            }
        },

        deleteStudent: function () {

        },

        exit: function () {
            $(document).off('keydown');
            $(document).off('click');
            this.remove();
            // app.mediator.publish('Students: renderStudentList');
            // this.$el.html('');
            // this.$el.append(this.template({'students': students}));
        }
    });
})(CS.Students, app);
