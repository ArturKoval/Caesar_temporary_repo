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
debugger;
            if (!nameValidation.test(studentName) || !nameValidation.test(studentSurname)) {
                this.showHints(this, 'Name not valid');
            } else {
                alert('validation passed!')
                // this.experts.push(newExpert);
                // this.renderList();
                // this.renderAddBtn();
            }
        },

        showHints: function (self, message) {
            var hints = [{
                    name: 'groupSelectExpert',
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
