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
            this.$el.html(this.template(this.student));
            return this;
        }
    });
})(CS.Students, app);