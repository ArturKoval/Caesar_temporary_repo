(function (This) {
    This.TeacherView = Backbone.View.extend({
        template: templates.groupTeachersTpl,

        events: {
            'click .add-teacher-btn': 'renderTeacherSelect',
            'click .remove': 'removeTeacher',
            'click #cancelSelect': 'renderAddBtn',
            'click #acceptSelect': 'addTeacher',
            'click .removeTeacher': 'removeTeacher'
        },

        initialize: function (teachers) {
            this.teachers = teachers;
            this.allTeachers = i.teachers;
        },

        render: function () {
            this.$el.html(this.template());
            this.renderList();
            this.renderAddBtn();
            return this;
        },

        renderList: function () {
            this.$el.find('.list').html(templates.groupTeacherTpl({teachers: this.teachers}))
        },

        renderAddBtn: function () {
            this.$el.find('.add-teacher').html(templates.groupMoreTeacherTpl())
        },

        renderTeacherSelect: function () {
            this.$el.find('.add-teacher').html(templates.groupSelectTeacherTpl({allTeachers: _.difference(this.allTeachers, this.teachers)}))
        },

        addTeacher: function () {
            var newTeacher = this.$el.find('#teachers option:selected').text();
            this.teachers.push(newTeacher);
            this.renderList();
            this.renderAddBtn();
        },

        removeTeacher: function (event) {
            this.teachers = _.without(this.teachers, $(event.target).data('teacher'));
            this.renderList()
        }
    });
})(CS.Groups);