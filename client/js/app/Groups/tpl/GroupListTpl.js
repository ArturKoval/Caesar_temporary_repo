templates.groupListTpl = ([
	'<div class="group-list-header row">',
		'<div class="search">',
			'<img src = "/img/search.png">',
		'</div>',
		'<div class="paginator-place-holder"></div>',
	'</div>',
	'<div class="group-collection row"></div>',
	'<div class="group-list-footer">',
		'<div class="stage-toggle">',
			'<input id="futureGroups" type="radio" name="group-status" value="planed">',
			'<label for="futureGroups"><div></div></label>',
			'<input id="currentGroups" type="radio" name="group-status" value="current" checked>',
			'<label for="currentGroups"><div></div></label>',
			'<input id="endedGroups" type="radio" name="group-status" value="ended">',
			'<label for="endedGroups"><div></div></label>',
		'</div>',
	'</div>'
].join(''));

templates.groupListTplNoGroups = ([
	'<div class="group-list-header row">',
		'<div class="search">',
			'<img src = "/img/search.png">',
		'</div>',
		'<div class="paginator-place-holder"></div>',
	'</div>',
	'<div class="group-collection row"></div>',
	'<div class="group-list-footer">',
		'<div class="stage-toggle">',
			'<input id="futureGroups" type="radio" name="group-status" value="planed">',
			'<label for="futureGroups"><div></div></label>',
			'<input id="currentGroups" type="radio" name="group-status" value="current" checked>',
			'<label for="currentGroups"><div></div></label>',
			'<input id="endedGroups" type="radio" name="group-status" value="ended">',
			'<label for="endedGroups"><div></div></label>',
		'</div>',
	'</div>'
].join(''));

templates.groupListScheduleTpl = ([
	'<div class="group-list-header row">',
	'<div class="search">',
	'<img src = "/img/search.png">',
	'</div>',
	'<div class="paginator-place-holder"></div>',
	'</div>',
	'<div class="group-collection row"></div>',
	'<div class="group-list-footer">',
	'<button class="myGroups">My Groups</button>'
].join(''));

templates.smallGroupTpl = _.template([
	'<div><p>' + '<%= name %>' + '</p></div>'
].join(''));