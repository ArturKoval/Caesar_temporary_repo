templates.groupListTpl = ([
	'<div class="group-list-header row">',
		'<div class="search col-sm-offset-2"><span class="fa fa-search" aria-hidden="true"></span></div>',
		'<div class="groups-nav">',
			'<span class="left-nav">prev  </span>',
			'<span class="page-nav">  .. /.. </span>',
			'<span class="right-nav">  next</span>',
		'</div>',
	'</div>',
	'<div class="group-collection row"></div>',
	'<div class="group-list-footer">',
		'<button class="myGroups">My Groups</button>',
		'<div class="stage-toggle">',
		'<input class="endedGroups" type="radio" name="group-status" value="ended">',
		'<input class="currentGroups" type="radio" name="group-status" value="current" checked>',
		'<input class="futureGroups" type="radio" name="group-status" value="planed">',
	'</div>'
].join(''));