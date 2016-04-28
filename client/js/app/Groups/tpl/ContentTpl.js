templates.contentTpl = _.template([
	'<div class="content-header-location" name="content-header-location">',
		'<p class = "groupLocation"></p>',
	'</div>',
	'<div class="content-header-group-name">',
		'<p class = groupName></p>',
	'</div>',
	'<div id="main-section" class="main-section"></div>',
	'<div class = "stageView">',
		'<p class = "groupStageTitle"></p>' , 
		'<p class = "groupStage"></p> ',
	'</div> ',
	'<div class = "flashMessage"></div> '
].join(''));
