(function (This, app) {
    This.EditStudentListView = Backbone.View.extend({
        tagName: 'section',

        className: 'backdrop',

        template: templates.secondStudentListModalViewTpl,

        events: {
        	'click .fa-chevron-right': 'render',
        }

        initialize: function () {
        	  this.mediator = app.mediator;
        },

        render: function () {
            this.$el.html(this.template(this.model));

       
        }


     
