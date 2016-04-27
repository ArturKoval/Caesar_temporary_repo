templates.scheduleTpl = _.template([
    '<header class="schedule-controls">',
        '<div class="btn-schedule">',
            '<button class="scBtn monthBtn"></button>',
            '<button class="scBtn weekBtn"></button>',
            '<button class="scBtn keyDatesBtn"></button>',
        '</div>',
    '</header>',
	'<div class="scheduleContainer"></div>'
].join(''));