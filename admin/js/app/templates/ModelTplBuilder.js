templates.model = [];

templates.model.build = function (module) {
	var fields = map[module].fields,
	    tpl = [];
	
	_.forEach(fields, function (type, field) {
	    var fieldTpl;
		
		if (type === '') {
			fieldTpl = '<td><%= ' + field + ' %></td>';
			tpl.push(fieldTpl);
		}
	})

    tpl.push('<td>');
    tpl.push('<button class="btn btn-info edit">Edit</button>');
    tpl.push('<button class="btn btn-danger delete">Delete</button>');
    tpl.push('</td>');
	
	return _.template(tpl.join(''));
};



