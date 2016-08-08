'use strict';

templates.confirmationTpl = _.template([
	'<div class="modal-body" >',
		'<div class="message-body">',
		    '<p class="text"> <%= value %> </p>',
		    '<div class="controls">',
		    	'<button class="btn okBtn">',
			    	'<i class="fa fa-check-circle-o fa-3x"></i>',
			    '</button>',
			    '<button class="btn cancelBtn">',
			    	'<i class="fa fa-times-circle-o fa-3x"></i>',
			   	'</button>',
		    '</div>',
		'</div>',
	'</section>'
].join(''));