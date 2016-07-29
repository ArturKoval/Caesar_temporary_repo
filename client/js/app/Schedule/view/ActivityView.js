'use strict';

(function (This) {
    This.ActivityView = Backbone.View.extend({
        template: templates.activityTpl,
        tag: 'div',
        className: 'activity',

        render: function() {

                this.$el.append(this.template(this.model));
        
            return this;
        }
    });
})(CS.Schedule);

