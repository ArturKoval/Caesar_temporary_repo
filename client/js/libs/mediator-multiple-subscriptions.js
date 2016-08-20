'use strict';

_.extend(Mediator.prototype, {
    multiSubscribe: function (subscribes, context) {
        var handler;

        for (var channel in subscribes) {
            handler = subscribes[channel];

            if (!_.isFunction(handler)) {
                handler = context[handler];
            }

            this.subscribe(channel, _.bind(handler, context));
        }
    }
});
