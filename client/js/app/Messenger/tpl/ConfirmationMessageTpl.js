'use strict';

templates.confirmationTpl = _.template([
	'<section class="modal-window confirmationMessage" >',
		    '<div class="text"> <%=text%> </div>',
		    '<div class="controls">',
		    	'<button class=okBtn><i class="fa fa-check fa-2x"></i></button>',
		    	'<button class=cancelBtn><i class="fa fa-close fa-2x"></i></button>',
		    '</div>',
	'</section>'
].join(''));