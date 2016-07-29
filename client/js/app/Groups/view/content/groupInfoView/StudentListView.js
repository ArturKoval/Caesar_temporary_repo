'use strict';

(function (This) {
    This.StudentListView = Backbone.View.extend({
        tagName: 'div',
        className: 'students_list',
        template: templates.studentListViewTpl,

        initialize: function () {
           // this.collection.on('change', this.render, this);
        },

        render: function () {
            this.$el.empty();
            students.forEach(function(student) {
                this.$el.append(this.template(student));
            }, this);

            return this;
        }
    });
})(CS.Groups);

var students = [{'name': 'Anastasyia Serheeva'},
 {'name': 'Vladyslava Tyshchenko'},
 {'name':'Anna Hranovska'},
 {'name':'Denis Poznukhov'},
 {'name':'Yuryi Tataryntsev'},
 {'name':'Artem Zhylko'},
 {'name':'Anastasiia Manilnykova'},
 {'name':'Yana Sharipbaeva'}];