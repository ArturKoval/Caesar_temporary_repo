'use strict';

Backbone.Controller = (function () {
    var controllerOptions = ['subscribes', 'mediator', 'createEditView', '$el', 'collectionView'];

	function Controller (options) {
        _.extend(this, _.pick(options, controllerOptions));
        this.initialize.apply(this, arguments);
        this.mediator.multiSubscribe(this.subscribes, this);
    };
	
    Controller.extend = function (protoProps, staticProps) {
        var parent = this,
            child;

        if (protoProps && _.has(protoProps, 'constructor')) {
            child = protoProps.constructor;
        } else {
            child = function () {
                return parent.apply(this, arguments);
            };
        }

        _.extend(child, parent, staticProps);

        var Surrogate = function () {
            this.constructor = child;
        };
		
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate;

        if (protoProps) _.extend(child.prototype, protoProps);

        child.__super__ = parent.prototype;

        return child;
    };	

    _.extend(Controller.prototype, {
        initialize: function () {  
        },
        
        start: function () {
            this.$el.append((this.collectionView.render().$el));
        },

        showAll: function () {
            this.hideAll();
            this.crudView && this.crudView.remove();
            this.collectionView.show();
        },

        createView: function () {
            this.crudView && this.crudView.remove();
            this.crudView = new this.createEditView();
            this.$el.append(this.crudView.render().el);
        },

        editById: function (id) {
            var model = this.collection.get(id);
			
            if (model) {
                this.editView(model);
            } else {
                cs.mediator.publish('Show404');
            }
        },

        editView: function (model) {
            this.crudView && this.crudView.remove();
            this.crudView = new this.createEditView({
                model: model
            });
            this.$el.append(this.crudView.render().el);
        },

        closeView: function () {
            this.crudView && this.crudView.remove();
        }		
    }, Controller.extend);

	return Controller;
})();