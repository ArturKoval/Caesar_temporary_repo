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
			this.listener = {
				'info': {view: 'GroupInfoView', model: this.model},
				'edit': {view: 'GroupCreateEditView', model: this.model},
				'shedule': {view: 'ScheduleView', model: this.model},
				'students': {view: 'StudentListView', collection: students},
				'message': {view: 'MessageView'}
			};
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this); 				
			
			$('#main-section').empty();
            $('#main-section').append(this.$el); // ContentView responsibility
			
            this.render();
           
        },

        render: function () {
            this.$el.empty(); 
            this.$el.append(templates.groupTpl(this.model.toJSON()));
            this.$groupContainer = $('.groupContainer');
            this.showStubView({view: 'GroupInfoView', model: this.model});
			
            return this;
        },

        stubsListener: function (e) {
            var $buttons = $('.groupView .active'),
                $el,
                action;
		
            if (e.currentTarget || e) {
                $el = $(e.currentTarget);
            } else {
                $el = $('.infoBtn');
            }

            if (typeof e !== 'string') {
                action = $el.attr('name');
				
                if (action !== 'edit') {
                    this.publishEvent(action); 
                }
            } else {
                action = e;
            }
			if (action === 'edit') {
				this.mediator.publish('Groups: edit-button-selected', this.model);
			} else {
                this.showStubView(this.listener[action]);
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
            this.mediator.publish('Groups: stubView-changed', {group: this.model, stubView: stubViewName});
        },

         showDeleteDialog: function () {
            this.mediator.publish('Groups: delete-dialog-called', this.model);
            /*this.mediator.publish('Messenger: show message', {
                type: 'confirmation',
                object: this.model,
                callback: function () {
                    this.model.destroy();
                },
                text: 'Group '+ this.model.get('name') + ' will be destroyed. Are you sure?'
             });*/
        }
    });
})(CS.Groups);

var students = [{'name': 'Anastasyia Serheeva'},
 {'name': 'Vladyslava Tyshchenko'},
 {'name':'Anna Hranovska'},
 {'name':'Denis Poznukhov'},
 {'name':'Yuryi Tataryntsev'},
 {'name':'Artem Zhylko'},
 {'name':'Anastasiia Manilnykova'},
 {'name':'Yana Sharipbaeva'}];