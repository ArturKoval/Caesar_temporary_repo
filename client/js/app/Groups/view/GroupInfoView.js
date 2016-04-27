'use strict';

(function (This) {
    This.GroupInfoView = Backbone.View.extend({
        tagName: 'div',
        className: 'groupInfoView',

        template: templates.groupInfoViewTpl,

        initialize: function () {
            // var keyDates = store.Schedules.getByName(this.model.get('name')).get('keyDates');
            var keyDates = {
                start: '02/01/2016',
                demo1: '02/22/2016',
                demo2: '03/14/2016',
                offering: '04/04/2016',
                finish:'04/25/2016'
            };
            this.model.on('change', this.render, this);

            this.keyDatesView = new This.GroupKeyDatesView({
                model: keyDates
            });
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.$keyDatesEl = this.$el.find('.key-dates');

            this.$keyDatesEl.append(this.keyDatesView.render().el);

            return this;
        }
    });
})(CS.Groups);