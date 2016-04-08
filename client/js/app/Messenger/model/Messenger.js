'use strict';

(function (This) {
    This.Messenger = Backbone.Model.extend({
        defaults: function () {
            return {
                type: '',
                object: '',
                action: '',
                text: ''
            };
        },

        questions: {
            'confirmation': 'Do you want to '
        },

        initialize: function () {
            this.defineText();
        },

        defineText: function () {
            this.set('text', this.questions[this.get('type')]+ this.get('action') + ' ' + this.get('object') + ' ?'); 
        }
    });
})(CS.Messenger);