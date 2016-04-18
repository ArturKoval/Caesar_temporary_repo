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
            var m, hintName, view, hintView;
            
            if (data.type === 'hints') {
                data.hints.forEach(function (hint) {
                    hintName = '#' + hint.name,
                    m = new This.Messenger(hint),
                    hintView = new This.HintView({model: m}).render().$el;
                    data.$el.find(hintName).before(hintView);
                }); 
            } else {
                m = new This.Messenger(data),
                view = new This[this.messageRouter[data.type].view]({model: m});
                $(''+ this.messageRouter[data.type].el).append(view.render().$el);
            }
        }
    });
})(CS.Messenger, app);