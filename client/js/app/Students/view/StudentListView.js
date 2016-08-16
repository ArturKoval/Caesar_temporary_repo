'use strict';

(function (This) {
    This.StudentListView = Backbone.View.extend({
        // subscribes: {
        //     'Students: edit-request': '',
        //     'Students: delete-request': '',
        //     'Students: create-request': '',
        // },

        tagName: 'table',

        className: 'students_list',

        template: templates.studentListViewTpl,

        events: {
            'click [name="studName"]': 'showStudent'
        },

        initialize: function () {
            // app.mediator.subscribe('Students: selected', this....);
            // app.mediator.subscribe('Students: selected', this....);
            // app.mediator.subscribe('Students: saved', this....);

           // this.collection.on('change', this.render, this);

        },

        showStudent: function () {
            // this.showStudent = new This.StudentView({model: this.model});

            // $('#modal-window').html(this.showStudent.render().el);

            alert('I will be showing a student');
        },

        render: function () {
            this.$el.empty();
            this.$el.append(this.template({'students': students}));

            return this;
        }
    });
})(CS.Groups);

var students = [
    {'name': 'Anastasyia Serheeva',
    'englishLevel': 'Upper-intermediate'},
    {'name': 'Vladyslava Tyshchenko',
    'avatar': 'photo url',
    'englishLevel': 'Intermediate low'},
    {'name':'Anna Hranovska',
    'englishLevel': 'Advanced'},
    {'name':'Denis Poznukhov',
    'avatar': 'photo url',
    'englishLevel': 'Intermediate low'},
    {'name':'Yuryi Tataryntsev',
    'avatar': 'photo url',
    'englishLevel': 'Intermediate low'},
    {'name':'Artem Zhylko',
    'englishLevel': 'Advanced'},
    {'name':'Anastasiia Manilnykova',
    'avatar': 'photo url',
    'englishLevel': 'Upper-intermediate'},
    {'name':'Yana Sharipbaeva',
    'englishLevel': 'Intermediate'}
    ];