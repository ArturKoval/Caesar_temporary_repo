templates.studentsTpl = _.template([
    '<header class="group-controls">',
        '<div class="buttons-wrapper">',
            '<% if ((app.user.isRole(\'Teacher\')) && (_.contains(teachers, app.user.getShortName()) && (stage !== \'finished\')) ||',
                '((app.user.isRole(\'Coordinator\')) && (app.user.isLocation(location))) ||',
                '(app.user.isRole(\'Administrator\'))) { %>',
                '<button class="btn editBtn" name="edit"> <i class="fa fa-cog fa-2x"></i></button>',
            '<% } %>',
        '</div>',
        '<div class="btn-group">',
            '<button class="btn listBtn" name="students"><i class="fa fa-graduation-cap fa-2x"></i></i></button>',
            '<button class="btn" name="shedule"><i class="fa fa-check-circle-o fa-2x"></i></button>',
            '<button class="btn" name="message"><i class="fa fa-envelope-o fa-2x"></i></button>',
        '</div>',
    '</header>',
	'<div class=groupContainer></div>'
].join(''));