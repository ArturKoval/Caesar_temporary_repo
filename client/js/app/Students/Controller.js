'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({

        subscribes: {
            'Students: edit-request': 'showForm',
            'Students: create-request': 'createStudent',
            'Students: groups selected': 'showSelectedGroup',
            'Students: edit request': 'editStudent',
            'Locations student: selected': 'render',
            'Menu: changed-page': 'deleteView'
        },

        initialize: function () {
            this.mediator = app.mediator;

            this.$content = $('#content-section');  
            this.$sidebar = $('#left-side-bar');
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

        editStudent: function (student) {
            var self = this;
            this.createStudent = new This.CreateStudentView();
            this.modal(this.createStudent);

            var $confirm = $('.save-changes');
            $confirm.on('click', function () {


                $(document).off('keydown');
                $(document).off('click');
                this.remove();

                self.mediator.publish('Students: edit-request', this.model);
            })
            this.approvalCheck();

            this.fillStudentInfo(student);
        },

        fillStudentInfo: function (student) {
            var data = {
                    name: $('.firstName'),
                    surname: $('.lastName'),
                    incomingTest: $('.incomingTest'),
                    entryScore: $('entryScore')
                },
                studentName = student.name.split(' ');
                // student[name].split(' ');

            for (let key in data) {
                data[key].val(student[key]);
            };

            $('.englishLevel').val(student.englishLevel.toLowerCase());
            $('.firstName').val(studentName[0]);
            $('.lastName').val(studentName[1]);
        },

        delete: function () {
            //....
        }, 

        start: function (locations) {
            app.mediator.publish('Locations student: selected', locations);       
        },

        showSelectedGroup: function (group, action) {
            var groupView = new This.StudentsView({
                model: group
            });

            $('.main-section').html(groupView.render().el);
            groupView.showStubView(action);
        },

        render: function () {
            this.deleteView();

            this.contentView = new This.ContentView();

            this.groupListView = new This.GroupListView({
                collection: store.groups
            });

            this.$content.html(this.contentView.render().el);
            this.$sidebar.html(this.groupListView.render().el);
        },

        showGroupViewByRoute: function (locations, groupName, action) {
            if (this.showLocationByRoute(locations)) {
                if (store.groups.findGroupByName(groupName)) {
                    this.showSelectedGroup(this.list(locations).findGroupByName(groupName), action);
                } else {
                    app.mediator.publish('Error: show-error-page', {
                        elem: this.$main,
                        message: 'such a group is not found'
                    });
                }
            }

            return store.groups.findGroupByName(groupName);
        },

        showLocationByRoute: function (arrLocations) {
            if (isLocation(arrLocations)) {
                app.mediator.publish('Error: show-error-page', {
                    elem: this.$main,
                    message: 'such a location is not found'
                });

                return false;
            } else {
                app.mediator.publish('Locations student: selected', arrLocations);

                return true;
            }

            function isLocation(locations) {
                var arr = [];

                locations.forEach(function (location) {
                    if (store.locations.getNames().indexOf(location) < 0) {
                        arr.push(location);
                    }
                });

                return arr.length;
            }
        },

        deleteView: function () {
            if (this.groupListView) {
                this.groupListView.remove();
            }

            if (this.contentView) {
                this.contentView.remove();
            }
        },

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
                    // customApprovalInput.html(''); doesn't clearing input
                    customInput.html('');
                    customApprovalInput.prop('disabled', true);
                }

            })
        }
    })
})(CS.Students, app);