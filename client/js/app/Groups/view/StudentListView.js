'use strict';

(function (This) {
    This.StudentListView = Backbone.View.extend({
        tagName: 'div',
        className: 'students_list',

        template: templates.studentListViewTpl,

        render: function() {
            this.collection.forEach(function(student) {
                this.$el.append(this.template(student));
            }, this);
            return this;
        }
    });

})(CS.Groups);