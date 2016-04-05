templates.contentHeaderTpl = _.template([
	'<p class = "groupLocation"><%= location %></p>',
	'<p class = groupName><%= name %></p>'
].join(''));

templates.contentFooterTpl = _.template([
		'<p class = "groupStageTitle">Stage: </p> <p class = "groupStage"><%= stage %></p> '
].join(''));
