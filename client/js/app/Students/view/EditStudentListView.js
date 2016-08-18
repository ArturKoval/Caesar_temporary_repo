'use strict';

(function (This, app) {
    This.EditStudentListView = Backbone.View.extend({
        tagName: 'section',

        className: 'backdrop',

        template: templates.studentListModalViewTpl,

        events: {
            'click .createStudent': 'createStudent',
            'click .downloadCV': 'downloadCV',
            'click .editStudent': 'editStudent',
            'click .deleteStudent': 'deleteStudent',
            'click .closeModalWindow': 'closeModalWindow'
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

        editStudent: function () {

        },

        deleteStudent: function () {

        },

        closeModalWindow: function () {
            $(document).off('keydown');
            $(document).off('click');
            this.remove();
            // app.mediator.publish('Students: renderStudentList');
            // this.$el.html('');
            // this.$el.append(this.template({'students': students}));
        }
    });
})(CS.Students, app);
