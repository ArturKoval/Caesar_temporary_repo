templates.model = [];

templates.model.build = function (module) {
	var fields = map[module].fields,
	    tpl = [];
	
	_.forEach(fields, function (type, field) {
	    var fieldTpl;
		
		if (type === '') {
			fieldTpl = '<td><%= ' + field + ' %></td>';
			tpl.push(fieldTpl);
		} else {
			if (type.control === 'select') {
				fieldTpl = '<td><%= ' + field + ' %></td>';
			    tpl.push(fieldTpl);
			}
			
			if (type.control === 'date') {
				fieldTpl = '<td><%= moment(' + field + ', "X").format("MM/DD/YYYY") %></td>';
			    tpl.push(fieldTpl);
			}
			
			if (type.control === 'array') {
				tpl.push('<td>');

				fieldTpl = '<% ' + field;
				fieldTpl += '.forEach(function (item) { %>';
				fieldTpl += '<%= item %><br>';	
			    fieldTpl += '<% }) %>';
				
				tpl.push(fieldTpl);
				tpl.push('</td>');
			}
			
			if (type.control === 'bool') {
				fieldTpl = '<td>';
                fieldTpl += '<input type="checkbox" ';
				fieldTpl += '<%= ' + field + ' && "checked" %>';
				fieldTpl += ' disabled>' + type.option;
                fieldTpl += '</td>';
				
				tpl.push(fieldTpl);
			}
		}
	})

    tpl.push('<td>');
    tpl.push('<button class="btn btn-info edit">Edit</button>');
    tpl.push('<button class="btn btn-danger delete">Delete</button>');
    tpl.push('</td>');
	
	return _.template(tpl.join(''));
};



