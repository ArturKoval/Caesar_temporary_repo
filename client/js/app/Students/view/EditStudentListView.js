'use strict';

(function (This) {
    This.EditStudentListView = Backbone.View.extend({
        tagName: 'section',

        className: 'backdrop',

        template: templates.studentListModalViewTpl,
        templateCreateStudent: templates.studentEditTpl,

        events: {
            'click .createStudent': 'createStudent',
            'click .downloadCV': 'downloadCV',
            'click .editStudent': 'editStudent',
            'click .deleteStudent': 'deleteStudent',
            'click .close-modal-window': 'exit',
            'click .save-changes': 'createNewStudent'
        },

        initialize: function (collection) {
            console.log(this.model);
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
      

            this.$el.html(this.templateCreateStudent(this.student));
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
        },

        createNewStudent: function () {
            var studentName = this.$el.find('[name=FirstName]').val(),
                studentSurname = this.$el.find('[name=LastName]').val(),
                nameValidation = /[A-Za-z]{1}[a-z]{1,9}[ -]{0,1}[A-Za-z]{1}[a-z]{1,9}/;

            if (!nameValidation.test(studentName) ) {
                this.showHints(this, 'You can use only letters, space and "-" ', 'FirstName');
            } if (!nameValidation.test(studentSurname)) {
                  this.showHints(this, 'You can use only letters, space and "-" ', 'LastName');
            } else if (nameValidation.test(studentSurname) && nameValidation.test(studentName)) {
                alert('validation passed!')
                // this.experts.push(newExpert);
                // this.renderList();
                // this.renderAddBtn();
            }
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
    });
})(CS.Groups);
