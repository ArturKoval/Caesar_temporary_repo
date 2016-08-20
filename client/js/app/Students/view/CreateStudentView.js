'use strict';

(function (This, app) {
    This.CreateStudentView = Backbone.View.extend({
        tag: 'section',

        className: 'backdrop',

        template: templates.studentEditTpl,

        events: {
            'click .close-modal-window': 'exit',
            'click .save-changes': 'createNewStudent'
        },

        initialize: function () {
            // this.mediator = app.mediator;
            this.mediator = app.mediator;
            this.listener = {
                'students': {view: 'StudentListView'},
                'editStudent': {view: 'EditStudentListView'}
            };
        },

        createNewStudent: function () {
            var studentName = this.$el.find('[name=FirstName]').val(),
                studentSurname = this.$el.find('[name=LastName]').val(),
                nameValidation = /[A-Za-z]{1}[a-z]{1,9}[ -]{0,1}[A-Za-z]{1}[a-z]{1,9}/,
                englishLevel = this.$el.find('.englishLevel').val(),
                incomingScore = this.$el.find('.incomingTest').val(),
                approvedBy = this.$el.find('.approvedBy').val(),
                newStudent;

            if (!nameValidation.test(studentName) ) {
                this.showHints(this, 'You can use only letters, space and "-" ', 'FirstName');
            } if (!nameValidation.test(studentSurname)) {
                  this.showHints(this, 'You can use only letters, space and "-" ', 'LastName');
            } else if (nameValidation.test(studentSurname) && nameValidation.test(studentName)) {
                newStudent = {
                    groupId: '',
                    name: studentName,
                    lastName: studentSurname,
                    englishLevel: englishLevel,
                    CvUrl: '',
                    avatar: '',
                    entryScore: incomingScore,
                    approvedBy: approvedBy
                }

                students.push(newStudent);
                console.log(students);
                $(document).off('keydown');
                $(document).off('click');
                this.remove();

                this.mediator.publish('Students: edit-request', this.model);
                // this.mediator.publish('Students: crud-request', 'edit');
            }
        },

        exit: function () {
            $(document).off('keydown');
            $(document).off('click');
            this.remove();
        },

        showHints: function (self, message, input) {
            var hints = [{
                    name: input,
                    text: message
                }];
               
            app.mediator.publish('Message', { 
                type: 'hints',
                $el: self.$el,
                hints: hints
            });
        },

        render: function () {
            var customApproval = "Custom",
                customInput = $('.custom-approval');

            this.$el.html(this.template(this.student));

            return this;
        }
    });
})(CS.Students, app);