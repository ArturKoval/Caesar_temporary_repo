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
                    if (hint.name === 'content-header-location') {
						console.log('*');
                        hintName = '.' + hint.name;
                    } else {
                        hintName = '[name$=' + hint.name + ']';
                    }
					
                    m = new This.Messenger(hint),
                    hintView = new This.HintView({model: m}).render().$el;
					if (['0','1', '2', '3', '4', '5', '6'].indexOf(hint.name) > -1) {
						data.$el.find(hintName).append(hintView);
					} else {
						data.$el.find(hintName).before(hintView);
					}
                    
                }); 
            } else {
                m = new This.Messenger(data),
                view = new This[this.messageRouter[data.type].view]({model: m});
                $(''+ this.messageRouter[data.type].el).append(view.render().$el);
            }
        }
    });
})(CS.Messenger, app);