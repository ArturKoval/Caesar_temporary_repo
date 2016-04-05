'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'CreateEvent': 'createView',
            'EditEvent': 'editView',
            'CreateEditViewClosed': 'closeView',
            'Group: deleteDialogCalled': 'showDeleteView'
        },

        initialize: function () {
            console.log('groups controller started');
            var contentView = new This.ContentView({model: new This.Group(app.store.groups[0])});
            //$('#content-header').append(contentView.render().$el);

            this.collection = new This.GroupList(app.store.groups);
            var view = new This.GroupView({model: new This.Group(app.store.groups[0])});
            var view2 = new GroupInfoView({model: new This.Group(app.store.groups[0])});
            this.$el = $('#main-section');
            this.$el.append(view.render().$el);
            this.$modalEl = $('#modal-window');
            $('#groupInfo').append(view2.render().$el);
            this.mediator = app.mediator;
        },

        showDeleteView: function (group) {
            var deleteView = This.GroupDeleteView({
                model: group
            });

            this.$modalEl.append(deleteView.render().el);
        }
    });
})(CS.Groups, app);