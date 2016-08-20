'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'Students: edit-request': 'showForm',
            'Students: create-request': 'createForm',
            'Students: groups selected': 'showSelectedGroup',
            'Locations student: selected': 'render'
        },

        initialize: function () {
            this.mediator = app.mediator;

            this.$content = $('#content-section');  
            this.$sidebar = $('#left-side-bar');
        },

        showForm: function (students) {
            var editStudentListView = new This.EditStudentListView(students);

            this.modal(editStudentListView);
        },

        createForm: function () {
            this.createStudent = new This.CreateStudentView();

            this.modal(this.createStudent);
        },

        delete: function () {
            //....
        }, 

        start: function (locations) {
            app.mediator.publish('Locations student: selected', locations);       
        },

        showSelectedGroup: function (group) {
            // var groupView = new This.GroupView({
            //     model: selected
            // });

            $('.main-section').html(group.get('name'));
            // groupView.showStubView(action);
            // console.dir("Need implementation -> you click on -> " + group.get('name'));
        },

        render: function () {
            console.log('RENDER IN STUDENTS');

            this.contentView = new This.ContentView();
            this.$content.html(this.contentView.render().el);
            
            if (this.groupListView) {
                this.groupListView.remove();
                // this.groupListView.paginatorView.remove();
            }
            this.groupListView = new This.GroupListView({
                collection: store.groups
            });

            this.$sidebar.html(this.groupListView.render().el);
        },

        showLocationByRoute: function (arrLocations) {
            this.render();

            if (isLocation(arrLocations)) {
                app.mediator.publish('Error: show-error-page', {
                    elem: this.$main,
                    message: 'such a location is not found'
                });

                return false;
            } else {
                console.log('here');
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

    // helper

        modal: function (view) {
            $('#modal-window').html(view.render().el);
        }
    })
})(CS.Students, app);