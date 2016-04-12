templates.groupTpl = _.template([
	'<% if ((app.user.role === \'Teacher\') && (_.contains(teachers, app.user.firstName.charAt(0) + \'. \' + app.user.lastName)) ||',
		'((app.user.role === \'Coordinator\') && (app.user.location === location)) ||',
		'(app.user.role === \'Administrator\')) { %>',
		'<div class="editBtn" name="edit"> <i class="fa fa-cog fa-2x"></i></div>',
	'<% } %>',
	'<% if (((app.user.role === \'Coordinator\') && (app.user.location === location)) || (app.user.role === \'Administrator\')) { %>',
		'<div class="deleteBtn" name="delete"><i class="fa fa-close fa-2x"></i></div>',
	'<% } %>',
	'<div class="infoBtn active" name="info"><i class="fa fa-info fa-2x"></i></div>',
	'<div class=studentsBtn name="students"><i class="fa fa-users fa-2x"></i></i></div>',
	'<div class=sheduleBtn name="shedule"><i class="fa fa-calendar fa-2x"></i></div>',
	'<div class=messageBtn name="message"><i class="fa fa-envelope-o fa-2x"></i></div>',
	'<div class=groupContainer></div>'
].join('')); 