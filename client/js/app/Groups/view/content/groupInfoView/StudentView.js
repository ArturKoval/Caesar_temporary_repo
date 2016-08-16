'use strict';

(function (This) {
    This.StudentView = Backbone.View.extend({
        tag: 'div',
        className: 'student',
        // template: template.studentRecordTpl,
        events: {
            'click .exit': 'exit' 
        },

        exit: function () {
            // this.remove();... 
        },

        render: function () {
            this.$el.html(this.template(this.model));

            return this;
        }
    });
})(CS.Groups);