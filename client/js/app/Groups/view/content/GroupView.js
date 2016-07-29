'use strict';

(function (This, app) {
    This.GroupView = Backbone.View.extend({
        tagName: 'div',
        className: 'groupView',
        $groupContainer: null,

        events: {
            'click .editBtn': 'renderEdit',
            'click .infoBtn':  'renderInfo',
            'click .studentsBtn': 'renderStudents',
            'click .sheduleBtn': 'renderSchedule',
            'click .messageBtn': 'renderMessage',
        },

        initialize: function () {
            this.mediator = app.mediator;
            this.listener = {
                'info': {view: 'GroupInfoView'},
                'edit': {view: 'GroupCreateEditView'},
                'shedule': {view: 'GroupScheduleView'},
                'students': {view: 'StudentListView'},
                'message': {view: 'MessageView'}
            };

            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
        },

        render: function () {
            this.$el.empty();
            this.$el.append(templates.groupTpl(this.model.toJSON()));

            return this;
        },

        renderInfo: function () {
            this.showStubView('info');
            this.publishEvent('info');
        },

        renderStudents: function () {
            this.showStubView('students');
            this.publishEvent('students');
        },

        renderSchedule: function () {
            this.showStubView('shedule');
            this.publishEvent('shedule');
        },

        renderMessage: function () {
            this.showStubView('message');
            this.publishEvent('message');
        },

        renderEdit: function () {
            this.mediator.publish('Groups: edit-request', this.model);
            this.mediator.publish('Groups: crud-request', 'edit');
        },

        showStubView: function (action) {
            if (action === undefined || typeof action === 'object') {
                action = 'info';
            }

            var data = this.listener[action],
                $groupContainer = this.$el.find('.groupContainer'),
                $buttons = this.$el.find('.active'),
                $el = $('.'+ action + 'Btn'),
                stubView;

            stubView = new This[data.view]({model: this.model});

            $groupContainer.empty();
            $groupContainer.append(stubView.render().$el);
            $buttons.removeClass('active');
            $el.addClass('active');
        },

        publishEvent: function (stubViewName) {
            this.mediator.publish('Groups: stubView-changed', {group: this.model, stubView: stubViewName});
        },

        showDeleteDialog: function () {
            this.mediator.publish('Groups: delete-request', this.model);
            this.mediator.publish('Groups: crud-request', 'delete');
        }
    });
})(CS.Groups, app);
