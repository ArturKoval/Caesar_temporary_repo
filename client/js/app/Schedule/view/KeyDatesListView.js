'use strict';

(function (This, app) {
    This.KeyDatesListView = Backbone.View.extend({
        tagName: 'table',
        className: 'keydates-schedule',

        template: templates.keyDatesListViewTpl,

        render: function () {
            this.$el.html(this.template);
            this.$tbody = this.$el.find('tbody');

            _.each(this.collection, function (keyDates) {
                var keyDatesView = new This.KeyDatesView({
                    model: keyDates
                });

                this.$tbody.append(keyDatesView.render().el);
            }, this);

            return this;
        }
    });
})(CS.Schedule, app);