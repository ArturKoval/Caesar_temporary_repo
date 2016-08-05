templates.groupDeleteViewTpl = _.template([
	'<div class="modal-body">',
		'<div class="message-body">',
		    '<p>Group <%= name %> will be deleted.</p>',
		    '<p>Are you sure?</p>',
		    '<div class="controls">',
			    '<button class="btn btn-delete">',
			    	'<i class="fa fa-check-circle-o fa-3x"></i>',
			    '</button>',
			    '<button class="btn btn-cancel">',
			    	'<i class="fa fa-times-circle-o fa-3x"></i>',
			   	'</button>',
			'</div>',
	   	'</div>',
	'</div>'
].join(''));