'use strict';

(function (This, app) {
    This.ScoreModalStudentListView = Backbone.View.extend({
        tagName: 'section',

        className: 'backdrop',

        template: templates.scoreModalStudentListTpl,

        events: {
            'click .fa-chevron-left': 'backwardForm',
            'click .exit': 'exit'
        },

        initialize: function () {
 	        this.mediator = app.mediator;
        },

        backwardForm: function () {
            this.mediator.publish('Students: edit-request', this.model);
        },
        
        exit: function () {
            $(document).off('keydown');
            $(document).off('click');
            this.remove();
        },

        render: function () {
            this.$el.html(this.template(this.model));

            return this;
        }
    });
})(CS.Students, app);