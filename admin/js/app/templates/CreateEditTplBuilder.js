templates.crud = {};

templates.crud.build = function (module) {
	var fields = map[module].fields,
	    tpl = [];
	
	tpl.push('<div class="modal fade" tabindex="-1" role="dialog">');
    tpl.push('<div class="modal-dialog">');
    tpl.push('<div class="modal-content">');
	
    tpl.push('<div class="modal-header">');
    tpl.push('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
    tpl.push('<h4 class="modal-title">Create/Edit ' + module + '</h4>');
    tpl.push('</div>');
		
    tpl.push('<div class="modal-body">');
    tpl.push('<div class="form-horizontal">');
		
	_.forEach(fields, function (type, field) {
	    var fieldTpl;
				
		tpl.push('<div class="form-group">');
        tpl.push('<label class="col-sm-2 control-label">' + field + '</label>');
        tpl.push('<div class="col-sm-10">');
		
		if (type === '') {
			fieldTpl = '<input type="text" class="form-control" name="' + field + '" aria-describedby="basic-addon1">',
			tpl.push(fieldTpl);
		} else {
			if (type.control === 'select') {
				tpl.push('<select class="form-control" name="' + field + '">');

				type.options.forEach(function (item) {
					tpl.push('<option value=' + item + '>' + item + '</option>')
				});
			
				tpl.push('</select>');
			}
			
			if (type.control === 'date') {
				tpl.push('<input type="date" class="form-control" name="' + field + '" >');
			}
			
			if (type.control === 'array') {
				tpl.push('<textarea class="form-control" rows="3" name="' + field + '" ></textarea>	');
				tpl.push('use ; to separate options'); 
			}
			
			if (type.control === 'bool') {
				fieldTpl = '<div class="checkbox">';
                fieldTpl += '<label><input type="checkbox" value="';
				fieldTpl += type.option + '" name="';
				fieldTpl += field;
				fieldTpl += '">' + type.option + '</label>';
                fieldTpl += '</div>';
				
				tpl.push(fieldTpl);
			}
		}		
		
		tpl.push('</div></div>');
	})

	tpl.push('</div></div>');
	
    tpl.push('<div class="modal-footer clearfix">');
    tpl.push('<button type="button" class="btn btn-primary submit">Submit</button>');
    tpl.push('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');
    tpl.push('</div></div></div></div>');
    
	
	return _.template(tpl.join(''));
};

                        
                        
                                
                            
                        