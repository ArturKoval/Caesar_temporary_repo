'use strict';

(function (This) {
    This.TimeBarView = Backbone.View.extend({
        tagName: 'div',
        className: 'timeBar',

	    template: templates.timeBarTpl,
        
        initialize: function () {
            this.model.on('change', this.render, this);
        },
        
        render: function () {
            var context = {
                time: this.model.getTime(),
                day: this.model.getDay(),
                date: this.model.getDate()
            };

            this.$el.html(this.template(context));

            return this;
        },
        
        remove: function () {
	        this.$el.remove();
	    }
    });    
})(CS.Messenger);