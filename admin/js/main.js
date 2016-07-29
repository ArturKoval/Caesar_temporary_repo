var CSAdmin = {},
    templates = {},
	app = {};	

$(function () {	
    app.mediator = new Mediator();		   
	
	_.forEach(map, function (options, module) {
		app[module] = {};
		
		app[module].collection = new CSAdmin.Collection();        
        app[module].controller = new CSAdmin.Controller(module);         		
		
		app[module].collection.url = options.settings.url;
		app[module].collection.module = module;
		app[module].collection.fetch();
	});
    	    
    $('.home').click(function () {
        window.location.href = '/';
    });    
	
    $('.nav a:first').tab('show');	
});
