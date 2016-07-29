'use strict';

(function (This, app) {
    This.Controller = (function () {
		function C (module) {
			this.module = module;
			
			this.initialize(module);
			this.setupSubscribes();			
			this.start();
		}
		
		function _initialize () {		  
		   this.collection = app[this.module].collection;
		   
		   this.collectionView = new This.ListView({collection: this.collection});		   
		   this.collectionView.module = this.module;		  		  
		   	
		   this.$el = this.prepareTab();		
           this.$modal = $('#modal-wrap');		   
		   
		   this.mediator = app.mediator;
		}
		
		function _prepareTab () {
		   $('.nav-tabs').append(templates.tab.build('nav', this.module));
           $('.tab-content').append(templates.tab.build('content', this.module));
		   
		   return $('#' + this.module);
		}
		
		function _setupSubscribes () {
            app.mediator.subscribe(this.module + 'create', this.createView, {}, this);
            app.mediator.subscribe(this.module + 'edit', this.editView, {}, this);
        }
		
		function _start () {
			this.$el.html(this.collectionView.render().el);
		}
		
		function _createView () {                       			
			this.crudView && this.crudView.remove();
		    this.crudView = new This.CreateEditView({collection: this.collection});
			this.crudView.module = this.module;
			
            this.$modal.html(this.crudView.render().el);
			this.$modal.find('.modal').modal('show');
        }
		
        function _editView (_model) {
            this.crudView && this.crudView.remove();
            this.crudView = new This.CreateEditView({model: _model});
			this.crudView.module = this.module;
			
            this.$modal.html(this.crudView.render().el);
			this.$modal.find('.modal').modal('show');
        }
		
		C.prototype.initialize = _initialize;
		C.prototype.prepareTab = _prepareTab;
		C.prototype.setupSubscribes = _setupSubscribes;
		C.prototype.start = _start;
		C.prototype.createView = _createView;
		C.prototype.editView = _editView;
		
		return C;
	})();	
})(CSAdmin, app);