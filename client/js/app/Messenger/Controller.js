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
            var hintView, 
                message, 
                hintName, 
                view;
            
            if (data.type === 'hints') {
                data.hints.forEach(function (hint) {
                    hintName = '[name$=' + hint.name + ']';
                    message = new This.Messenger(hint),
                    hintView = new This.HintView({model: message}).render().$el;

					if (['0', '1', '2', '3', '4', '5', '6'].indexOf(hint.name) > -1) {
						data.$el.find(hintName).append(hintView);
					} else {
						data.$el.find(hintName).before(hintView);
					}
                });

            } else {
                message = new This.Messenger(data),
                view = new This[this.messageRouter[data.type].view]({model: message});
                $(''+ this.messageRouter[data.type].el).append(view.render().$el);
            }
        }
    });
})(CS.Messenger, app);