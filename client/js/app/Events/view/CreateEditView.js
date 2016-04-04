'use strict';

(function (This) {
    This.CreateEditView = new Backbone.View.extend({
		className: 'modal fade in eventsScroll',
        template: templates.editEventTpl,
        
        events: {
            'click .save': 'save',
            'click .cancel': 'cancel',      
        },

        initialize: function () {
            this.model = this.model || new This.Event();
        },

        render: function () {
            this.$el.html(template());
			
            return this;
        },

        save: function () {
            // save action
        },

		cancel: function () {
            // cancel action
        }                    
    });
})(CS.Events);