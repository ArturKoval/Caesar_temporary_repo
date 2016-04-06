'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'Groups: callStub': 'changeView',
        },

        initialize: function () {
            /* var groupListView = new This.groupListView(); */ //later

            var contentView = new This.ContentView({model: new This.Group(app.store.groups[3])}),
                groupView = new This.GroupView({model: new This.Group(app.store.groups[3])}),
                groupListView = new This.GroupListView({collection: new This.GroupList(app.store.groups)});
                
            $('#content-header').append(contentView.renderHeader().$el);
            $('#content-footer').append(contentView.renderFooter().$el);
            $('#left-side-bar').append(groupListView.$el)
                .append(groupListView.render());

            //this.collection = new This.GroupList(app.store.groups);
            //console.log(this.collection); 

            this.mediator = app.mediator;    
        },
        
        changeView: function (stub) {
            var $el = $('.info');

            switch (stub) {
                case 'infoBtn':
                    var groupInfoView = new This.GroupInfoView({model: new This.Group(app.store.groups[0])});
                    this.destroyCurrentView();
                    $el.append(groupInfoView.render().$el);
                    break;
                case 'studentsBtn':
                    var studentListView = new This.StudentListView({collection: app.store.users});
                    this.destroyCurrentView();
                    $el.append(studentListView.render().$el);
                    break;
                case 'sheduleBtn':
                    var scheduleView = new This.ScheduleView({collection: app.store.groups});

                    this.destroyCurrentView();
                    $el.append(scheduleView.render().$el);
                    break;
                case 'messageBtn':
                    var messageView = new This.MessageView();

                    this.destroyCurrentView();
                    $el.append(messageView.render().$el);
                    break;
            }
        },

        destroyCurrentView: function () {
           $('.info').empty();
        },
        
        createView: function (a) {
            console.log(a);
        }
    });
})(CS.Groups, app);