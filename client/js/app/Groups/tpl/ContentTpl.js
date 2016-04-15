templates.contentLocationTpl = _.template([
	'<p class = "groupLocation"  ><%= location %></p>',
].join(''));

templates.contentGroupNameTpl = _.template([
	'<p class = groupName><%= name %></p>'
].join(''))

templates.contentFooterTpl = _.template([
	'<div class = "stageView">',
		'<p class = "groupStageTitle">Stage:  </p>' , 
		'<p class = "groupStage"><%= stage %></p> ',
	'</div> ',
	'<div class = "flashMessage"></div> '
].join(''));
