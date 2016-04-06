'use strict';

(function (This) {
    This.GroupView = Backbone.View.extend({
    	tagName: 'div',
    	className: 'groupView',
        events: {
            'click .editBtn': 'debug',
            'click .infoBtn': 'showInfo',
            'click .studentsBtn': 'debug',
            'click .sheduleBtn' : 'debug',
            'click .messageBtn' : 'debug'
        },
        $groupContainer: null,
        initialize: function () {
        	this.model.on('change', this.render, this);
			this.model.on('destroy', this.remove, this);
            $('#main-section').append(this.render().$el);
            this.$groupContainer = $('.groupContainer');
            this.showInfo();
        },
        render: function () {
        	this.$el.append(templates.groupTpl());
        	return this;
        },
        debug: function (e) {
            var $el;
            if (e) {
                $el = $(e.currentTarget);
            } else {
                $el = $('.infoBtn');
            }
            var $buttons = $('.groupView > .active');
            $buttons.removeClass('active');
            $el.addClass('active');
            this.$groupContainer.empty();
            this.$groupContainer.text('Some info here');
        },
        showInfo: function (e) {
            this.debug(e);
            var groupInfoView = new This.GroupInfoView({model: this.model});
            this.$groupContainer.empty();
            this.$groupContainer.append(groupInfoView.render().$el);
        }
    });
})(CS.Groups);