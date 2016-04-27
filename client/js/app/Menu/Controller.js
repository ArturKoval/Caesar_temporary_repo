'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            
        },

        initialize: function () {
            this.mediator = app.mediator;
            this.$topMenu = $('.top-menu');
            this.collection = [
                {icon:'fa fa-globe fa-2x', description: 'Locations'},
                {icon:'fa fa-file-text-o fa-2x', description: 'add'},
                {icon:'fa fa-calendar fa-2x', description: 'Schedule'},
                {icon:'fa fa-users fa-2x', description: 'Groups'},
                {icon:'fa fa-envelope-o fa-2x', description: 'add'},
                {icon:'fa fa-info fa-2x', description: 'About'}
                ];
            this.menuCollection = new This.Menu(this.collection);
            this.mainMenu = new This.MainMenuView({collection: this.menuCollection, el: this.$topMenu});
            this.mainMenu.render();
            
        }
    });
})(CS.Menu, app);