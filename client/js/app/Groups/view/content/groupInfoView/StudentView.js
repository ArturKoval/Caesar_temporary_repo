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
            // this.remove();...  //go...
        },

        render: function () {
            this.$el.append(template(this.model));

            return this;
        }
    });
})(CS.Groups);