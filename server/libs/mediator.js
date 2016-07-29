'use strict';
var _ = require('underscore');

function Mediator () {
    var instance;
    if (!instance) {
        instance = this;
    } 

    return instance;
}

_.extend(Mediator.prototype, {
    channels: {},
    instance: '', 

    subscribe: function (channel, callback) {
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        
        console.log('subscribe')
        this.channels[channel].push({callback : callback});

        return this;    
    },

    publish: function (channel) {
        var channel,
            args;

        console.log('publish')
        //console.log(this.channels)
        if (!this.channels[channel]) {
            return false;   
        }

        channel = this.channels[channel];
        args = Array.prototype.slice.call(arguments, 1);
        channel.forEach(function (subscriber) {
            console.log(args)
            subscriber.callback.apply(null, args);
        });

        return this;
    } 
});

module.exports = new Mediator();