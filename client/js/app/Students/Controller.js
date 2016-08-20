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

            this.approvalCheck();
        },

        delete: function () {
            //....
        }, 

    // helper

        modal: function (view) {
            $('#modal-window').html(view.render().el);
        },

        approvalCheck: function () {
            var customApproval = "Custom",
                customInput = $('.custom-approval');

          
            $('.approvedBy').change(function () {
                var customApprovalInput = $('.custom-approval-input');

                customApprovalInput.prop('disabled', true);

                if( $('.approvedBy').val() === customApproval ) {
                    customInput.html('Custom approve');
                    customApprovalInput.prop('disabled', false);
                } else if ( $('.approvedBy').val() !== customApproval) {
                    customInput.html('');
                    // customApprovalInput.html(''); doesn't clearing input
                    customApprovalInput.prop('disabled', true);
                }

            })
        }
    })
})(CS.Students, app);