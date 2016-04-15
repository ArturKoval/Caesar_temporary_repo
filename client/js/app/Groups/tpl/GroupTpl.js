templates.groupTpl = _.template([
    '<header class="group-controls">',
        '<% if ((app.user.isRole(\'Teacher\')) && (_.contains(teachers, app.user.getShortName())) ||',
            '((app.user.isRole(\'Coordinator\')) && (app.user.isLocation(location))) ||',
            '(app.user.isRole(\'Administrator\'))) { %>',
            '<button class="btn editBtn" name="edit"> <i class="fa fa-cog fa-2x"></i></button>',
        '<% } %>',
        '<% if (((app.user.isRole(\'Coordinator\')) && (app.user.isLocation(location))) || (app.user.isRole(\'Administrator\'))) { %>',
            '<button class="btn deleteBtn" name="delete"><i class="fa fa-close fa-2x"></i></button>',
        '<% } %>',
        '<div class="btn-group">',
            '<button class="btn infoBtn" name="info"><i class="fa fa-info fa-2x"></i></button>',
            '<button class="btn studentsBtn" name="students"><i class="fa fa-users fa-2x"></i></i></button>',
            '<button class="btn sheduleBtn" name="shedule"><i class="fa fa-calendar fa-2x"></i></button>',
            '<button class="btn messageBtn" name="message"><i class="fa fa-envelope-o fa-2x"></i></button>',
        '</div>',
    '</header>',
	'<div class=groupContainer></div>'
].join('')); 