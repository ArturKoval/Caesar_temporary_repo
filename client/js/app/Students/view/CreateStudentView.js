'use strict';

(function (This) {
    This.CreateStudentView = Backbone.View.extend({
        tag: 'div',
        className: 'student',
        // template: template.studentRecordTpl,
        events: {
            'click .exit': 'exit' 
        },

        initialize: function () {

        },

        exit: function () {
            // this.remove();... 
        },

        render: function () {
            alert('hello, I`ll be a new Student');
            // this.$el.html(this.template(this.model));

            return this;
        }
    });
})(CS.Students);