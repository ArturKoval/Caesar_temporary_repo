'use strict';

(function (This, app) {
    This.KeyDateScheduleView = Backbone.View.extend({
        tagName: 'table',
        className: 'keydates-schedule',

        template: templates.keyDateScheduleViewTpl,

        render: function () {
            this.$el.html(this.template);
            this.$tbody = this.$el.find('tbody');

            _.each(this.collection, function (keyDateList) {
                var keyDateListView = new This.KeyDateListView({
                    collection: keyDateList
                });

                this.$tbody.append(keyDateListView.render().el);
            }, this);

            return this;
        }
    });

})(CS.Schedule, app);