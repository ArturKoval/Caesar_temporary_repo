'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'Students: edit-request': 'showForm',
            'Students: create-request': 'createForm',
            'Students: groups selected': 'showSelectedGroup',
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
            
            app.mediator.publish('Locations: selected', locations);

            // this.contentView = new CS.Groups.ContentView();
            this.groupListView = new This.GroupListView({
                collection: store.groups
            });
            // console.dir($('#content-section'));
            $('#content-section').html("HEELOOO");              
            $('#left-side-bar').html(this.groupListView.render().el);              
        },

        showSelectedGroup: function (group) {
            console.dir(group.toJSON());
        },

    // helper

        modal: function (view) {
            $('#modal-window').html(view.render().el);
        }
    })
})(CS.Students, app);