'use strict';

(function (This) {
    This.ContextMenu = Backbone.Collection.extend({
        model: This.ItemContextMenu,

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

        getVisible: function () {
            return _(this.models).filter(function (model) {
                return model.get('isVisible');
            });
        },

        forbidden: function () {
            return false;
        },

        //functions for rules

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
