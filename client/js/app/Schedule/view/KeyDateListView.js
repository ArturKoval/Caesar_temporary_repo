'use strict';

(function (This) {
    This.KeyDateListView = Backbone.View.extend({
        tagName: 'tr',

        render: function () {
            _.each(this.collection, function (keyDate) {
                var keyDateView = new This.KeyDateView({
                    model: keyDate
                });

                this.$el.append(keyDateView.render().el);
            }, this);

            return this;
        }
    });

})(CS.Schedule);