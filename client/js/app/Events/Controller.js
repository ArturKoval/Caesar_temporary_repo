'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'CreateEvent': 'createView',
            'EditEvent': 'editView',
            'CreateEditViewClosed': 'closeView'
        },

        initialize: function () {
            this.collection = collections.eventsCollection;
            this.collectionView = new This.EventCollectionView();
            this.createEditView = new This.CreateEditView();
            this.$el = $('#main');
            this.mediator = app.mediator;
        }
    });
})(CS.Events, app);