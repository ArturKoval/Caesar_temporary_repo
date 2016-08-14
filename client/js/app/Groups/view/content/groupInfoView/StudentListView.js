'use strict';

(function (This) {
    This.StudentListView = Backbone.View.extend({
        tagName: 'table',
        className: 'students_list',
        template: templates.studentListViewTpl,

        initialize: function () {
           // this.collection.on('change', this.render, this);
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