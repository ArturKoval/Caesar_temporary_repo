'use strict';

templates.flashInfoTpl = _.template([
			'<div class="pictureInfo"> &#10003;</div>',
		    '<div class="textInfo"> <%=text%></div>',
		    '<button class="close"><i class="fa fa-close fa-2x"></i></button>',
].join(''));

templates.flashWarningTpl = _.template([
			'<div class="pictureWarning">!</div>',
		    '<div class="textWarning"> <%=text%></div>',
		    '<button class="close"><i class="fa fa-close fa-2x"></i></button>',
].join(''));