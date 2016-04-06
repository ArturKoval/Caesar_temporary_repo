'use strict';

(function (This) {
    This.GroupView = Backbone.View.extend({
        tagName: 'div',
        className: 'groupView',
        events: {
            'click .editBtn': 'debug',
            'click .infoBtn': function(e){this.whichClicked('infoBtn'); this.debug(e)},
            'click .studentsBtn': function(e){this.whichClicked('studentsBtn'); this.debug(e)},
            'click .sheduleBtn' : function(e){this.whichClicked('sheduleBtn'); this.debug(e)},
            'click .messageBtn' : function(e){this.whichClicked('messageBtn'); this.debug(e)}
        },
        $groupContainer: null,
        initialize: function () {
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
            $('#main-section').append(this.render().$el);
            this.$groupContainer = $('.groupContainer');
            this.showInfo();
            this.mediator = app.mediator;
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
        },
        showInfo: function () {
            var groupInfoView = new This.GroupInfoView({model: this.model});
            this.$groupContainer.empty();
            this.$groupContainer.append(groupInfoView.render().$el);
        },
        
        whichClicked: function (button) {
            app.mediator.publish('Groups: callStub', button);
        }
    });
})(CS.Groups);