'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'Groups: selected': 'updateContextMenu'
        },

        initialize: function () {
            this.mediator = app.mediator;
            this.$topMenu = $('.top-menu');
            this.collection = [
                {
                    icon:'fa fa-globe fa-2x', description: 'Locations'
                },{
                    icon:'fa fa-file-text-o fa-2x', description: 'add'
                },{
                    icon:'fa fa-calendar fa-2x', description: 'Schedule'
                },{
                    icon:'fa fa-users fa-2x', description: 'Groups'
                },{
                    icon:'fa fa-envelope-o fa-2x', description: 'add'
                },{
                    icon:'fa fa-info fa-2x', description: 'About'
                }
                ];
            this.menuCollection = new This.Menu(this.collection);
            this.mainMenu = new This.MainMenuView({collection: this.menuCollection, el: this.$topMenu});
            this.mainMenu.render();


            this.$leftMenu = $('.left-menu');
            this.contextCollection = [
                {
                    icon: 'fa fa-plus-square-o fa-4x create', description: 'Create', rules: {
                    'Teacher': ['forbidden']
                }
                }, {
                    icon: 'fa fa-search fa-4x search', description: 'Search'
                }, {
                    icon: 'fa fa-cog fa-4x edit', description: 'Edit', rules: {
                        'Coordinator': ['isMyLocation'],
                        'Teacher': ['isMyTeacher', 'isNotGraduated']
                    }
                }, {
                    icon: 'fa fa-trash-o fa-4x delete', description: 'Delete', rules: {
                        'Coordinator': ['isMyLocation'],
                        'Teacher': ['forbidden']
                    }
                }
            ];
            this.contextMenuCollection = new CS.Menu.ContextMenu(this.contextCollection);
            this.contextMenuView = new CS.Menu.ContextMenuView({collection: this.contextMenuCollection});
            this.$leftMenu.html(this.contextMenuView.render().$el);
            this.contextMenuCollection.checkPermissions();
        },

        updateContextMenu: function (groupModel) {
            this.contextMenuCollection.checkPermissions(groupModel);
        }
    });
})(CS.Menu, app);