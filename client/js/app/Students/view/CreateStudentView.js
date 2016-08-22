'use strict';

(function (This, app) {
    This.CreateStudentView = Backbone.View.extend({
        tag: 'section',

        className: 'backdrop',

        template: templates.studentCreateTpl,

        events: {
            'click .close-modal-window': 'exit',
            'click .save-changes': 'createNewStudent'
        },

        initialize: function () {
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
                entryScore = this.$el.find('.entryScore').val(),
                newStudent,
                approvedBy;

            if (!nameValidation.test(studentName) ) {
                this.showHints(this, 'You can use only letters, space and "-" ', 'FirstName');
            } if (!nameValidation.test(studentSurname)) {
                  this.showHints(this, 'You can use only letters, space and "-" ', 'LastName');
            } else if (nameValidation.test(studentSurname) && nameValidation.test(studentName)) {
              
                if( this.$el.find('.custom-approval-input').prop('disabled')) {
                    approvedBy = this.$el.find('.approvedBy').val();
                } else {
                    approvedBy = this.$el.find('.custom-approval-input').val();
                };

                newStudent = {
                    groupId: '',
                    name: studentName,
                    lastName: studentSurname,
                    englishLevel: englishLevel,
                    CvUrl: '',
                    avatar: '',
                    entryScore: entryScore,
                    incomingScore: incomingScore,
                    approvedBy: approvedBy
                }


                students.push(newStudent);
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
            this.$el.html(this.template())  ;

            return this;
        }
    });
})(CS.Students, app);