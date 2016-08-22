'use strict';

(function (This, app) {
    This.StudentsView = Backbone.View.extend({
        tagName: 'div',
        className: 'groupView',
        $groupContainer: null,
        defaultAction: 'list', // list, approved, score

        events: {
            'click .editBtn': 'renderEditStudent',
            'click .listBtn':  'renderList',
        },

        initialize: function () {
            this.mediator = app.mediator;
            this.listener = {
                'list': {view: 'StudentListView'}, 
                'editStudent': {view: 'EditStudentListView'}
            };

            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
        },

        render: function () {
            this.$el.empty();
            this.$el.append(templates.studentsTpl(this.model.toJSON()));

            return this;
        },

        renderList: function () {
            this.showStubView(this.defaultAction);
            this.publishEvent(this.defaultAction);
        },

        renderEditStudent: function () {
            this.mediator.publish('Students: edit-request', this.model);
            this.mediator.publish('Students: crud-request', 'edit');
        },

        showStubView: function (action) {
            var $editBtn, data, $groupContainer, $buttons, $el, stubView;

            if (action === undefined || typeof action === 'object') {
                action = this.defaultAction;
            } 

            if (action === 'students' || action === 'editStudentBtn') {
                $editBtn = this.$el.find('.editBtn');

                $editBtn.removeClass('editBtn');
                $editBtn.addClass('editStudentBtn');
            } else {
                $editBtn = this.$el.find('.editStudentBtn');

                $editBtn.removeClass('editStudentBtn');
                $editBtn.addClass('editBtn');
            }

            data = this.listener[action],
            $groupContainer = this.$el.find('.groupContainer'),
            $buttons = this.$el.find('.active'),
            $el = $('.'+ action + 'Btn'),

            stubView = new This[data.view]({model: this.model.get('students')});

            $groupContainer.empty();
            $groupContainer.append(stubView.render().$el);
            $buttons.removeClass('active');
            $el.addClass('active');
        },

        publishEvent: function (stubViewName) {
            this.mediator.publish('Students: stubView-changed', {group: this.model, stubView: stubViewName});
        }
    });
})(CS.Students, app);
