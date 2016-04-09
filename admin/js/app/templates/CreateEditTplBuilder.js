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
		}
		
		if (type === 'list') {
			/*'<select class="form-control" name="role">',
                                    '<option>Teacher</option>',
                                    '<option>Coordinator</option>',
                                    '<option>Administrator</option>',
                                    '<option>Recruiter</option>',
                                    '<option>TSE</option>',
                                '</select>',*/
			fieldTpl = '<input type="text" class="form-control" name="' + field + '" aria-describedby="basic-addon1">',
			tpl.push(fieldTpl);
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

                        
                        
                                
                            
                        