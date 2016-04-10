templates.tab = {};

templates.tab.build = function (type, module) {
	var tpl = [];
	
	if (type === 'nav') {
        tpl.push('<li role="presentation">');
		tpl.push('<a href="#' + module + '" aria-controls="home" role="tab" data-toggle="tab">' + module + '</a>');
        tpl.push('</li>');
	}
	
	if (type === 'content') {
		tpl.push('<div id="' + module + '" role="tabpanel" class="tab-pane" ></div>');
	}
	
	return _.template(tpl.join(''));
};

