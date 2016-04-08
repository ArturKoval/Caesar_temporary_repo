'use strict';

(function (This) {
    This.GroupView = Backbone.View.extend({
        tagName: 'div',
        className: 'groupView',
        $groupContainer: null,
        events: {
            'click .editBtn': 'stubsListener',
            'click .infoBtn':  'stubsListener',
            'click .studentsBtn': 'stubsListener',
            'click .sheduleBtn': 'stubsListener',
            'click .messageBtn': 'stubsListener',
            'click .deleteBtn': 'showDeleteDialog'
        },
        
        initialize: function () {
            this.mediator = app.mediator;
			this.mediator.subscribe

            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);

            $('#main-section').append(this.render().$el); // ContentView responsibility

            this.$groupContainer = $('.groupContainer');
            this.showStubView({view: 'GroupInfoView', model: this.model});
        },

        render: function () {
            this.$el.append(templates.groupTpl());
            return this;
        },

        stubsListener: function (e) {
            var $buttons = $('.groupView > .active'),
                $el,
                btnClassName;

            if (e) {
                $el = $(e.currentTarget);
            } else {
                $el = $('.infoBtn');
            }

            btnClassName = $el.attr("class");
			if (btnClassName === 'editBtn') {
			} else {
				this.publishEvent(btnClassName.substr(0, btnClassName.length - 3)); 
			}
           
            switch (btnClassName) {
                case 'editBtn':
                    this.mediator.publish('Groups: Edit button selected', this.model);
                     break;
                case 'infoBtn':
                    this.showStubView({view: 'GroupInfoView', model: this.model});
                    break;
                case 'studentsBtn':
                    this.showStubView({view: 'StudentListView', collection: students});
                    break;
                case 'sheduleBtn':
                    this.showStubView({view: 'ScheduleView', collection: store.groups});
                    break; 
                case 'messageBtn':
                    this.showStubView({view: 'MessageView'});
                    break;
            }

            $buttons.removeClass('active');
            $el.addClass('active');
        },

        showStubView: function (data) {
            var stubView = new This[data.view]({model: data.model, collection: data.collection});

            this.$groupContainer.empty();
            this.$groupContainer.append(stubView.render().$el);
        },
        
        publishEvent: function (stubViewName) {
            this.mediator.publish('Groups: StubView changed', {group: this.model, stubView: stubViewName});
        },

        showDeleteDialog: function () {
            this.mediator.publish('Groups: DeleteDialogCalled', this.model);
        }
    });
})(CS.Groups);

var students = [{'name': 'Artem', 'role': 'student'}, {'name': 'Nastya', 'role': 'student'}];