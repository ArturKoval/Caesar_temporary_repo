templates.collection = {};

templates.collection.build = function (module) {
	var fields = map[module].fields,
	    tpl = [];
	
	tpl.push('<table class="table table-striped table-hover">');
	tpl.push('<thead>');
	
	_.forEach(fields, function (type, field) {
	    var fieldTpl;
				
		fieldTpl = '<th>' + field + '</th>';
		tpl.push(fieldTpl);
	})

    tpl.push('<th class="actions text-center">actions</th>');
    tpl.push('</thead>');
    tpl.push('<tbody>');
    tpl.push('</tbody>');
	tpl.push('</table>');
	tpl.push('<button id="add-new-user" class="btn btn-info" data-toggle="modal">Add ' + map[module].settings['item'] + '</button>');
	
	return _.template(tpl.join(''));
};

