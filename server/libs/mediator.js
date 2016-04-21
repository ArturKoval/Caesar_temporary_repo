'use strict';
var _ = require('underscore');

function Mediator () {}

_.extend(Mediator.prototype, {
    channels: {},

    subscribe: function (channel, callback) {
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
          
        this.channels[channel].push({callback : callback});

        return this;    
    },

    publish: function (channel) {
        var channel,
            args;

        if (!this.channels[channel]) {
            return false;   
        }

        channel = this.channels[channel];
        args = Array.prototype.slice.call(arguments, 1);
        channel.forEach(function (subscriber) {
            subscriber.callback.apply(null, args);
        });

        return this;
    } 
});

module.exports = new Mediator();