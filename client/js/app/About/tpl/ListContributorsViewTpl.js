templates.ListContributorsViewTpl = _.template([
	'<div class="modal-body">',
		'<div class="containerContributors">',
		    '<div class = "row photosContainer"></div>',
		    '<div class = "contributorsName"></div>',
		    	'<div class="controls">',
			    	'<button class="btn btn-cancel">',
			    		'<i class="fa fa-check-circle-o fa-3x"></i>',
			   		'</button>',
				'</div>',
	   	'</div>',
	'</div>'
].join(''));