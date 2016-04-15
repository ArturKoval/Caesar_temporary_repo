'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'Message': 'showMessage'
        },

        initialize: function () {
           this.mediator = app.mediator;
           this.messageRouter = {
                'confirmation': {view: 'ConfirmationView', el: '#modal-window'},
                'flash-info': {view: 'FlashMessageView', el: '.flashMessage'},
                'flash-warning': {view: 'FlashMessageView', el: '.flashMessage'}
           };
        },

        showMessage: function (data) {
            if (data.type === 'hints') {
                data.hints.forEach( function (hint) {
                    var hintName = '#' + hint.name,
                        hintMessage = hint.message,
                        m = new This.Messenger(hint),
                        hintView = new This.HintView({model: m}).render().$el;

                    data.$el.find(hintName).before(hintView);

                }); 
            } else {
                var m = new This.Messenger(data),
                    view = new This[this.messageRouter[data.type].view]({model: m});

                $(''+this.messageRouter[data.type].el).append(view.render().$el);
            }
        }
    });
})(CS.Messenger, app);