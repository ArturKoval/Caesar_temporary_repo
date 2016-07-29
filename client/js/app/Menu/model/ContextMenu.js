'use strict';

(function (This) {
    This.ContextMenu = Backbone.Collection.extend({
        model: This.ItemContextMenu,

        context: 'info',

        checkPermissions: function (groupModel) {
            this.selectedGroupModel = groupModel;
            
            _(this.models).each(function (model) {
                var rules,
                    result;
                
                rules = model.get('rules')[app.user.get('role')];

                if (rules) {
                    result = _(rules).map(function (rule) {
                        return this[rule](groupModel);
                    }, this);
                }

                model.set('isVisible', _.every(result));
            }, this)
        },

        changeContext: function (context) {
            this.context = context;
        },

        getVisible: function () {
            return _(this.models).filter(function (model) {
                return model.get('isVisible');
            });
        },

        //functions for rules

        forbidden: function () {
            return false;
        },

        isSelected: function () {
            return _.isObject(this.selectedGroupModel);
        },

        isMyTeacher: function (groupModel) {
            if (groupModel) {
                return groupModel.isMyTeacher(app.user.getShortName());
            }
        },

        isMyLocation: function (groupModel) {
            if (groupModel) {
                return groupModel.isMyLocation(app.user.get('location'));
            }
        },

        isNotGraduated: function (groupModel) {
            if (groupModel) {
                return !groupModel.isMyState('finished');
            }
        }
    });
})(CS.Menu);
