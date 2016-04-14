templates.contentLocationTpl = _.template([
	'<p class = "groupLocation"  ><%= location %></p>',
].join(''));

templates.contentGroupNameTpl = _.template([
	'<p class = groupName><%= name %></p>'
].join(''))

templates.contentFooterTpl = _.template([
	'<p class = "groupStageTitle">Stage: </p> <p class = "groupStage"><%= stage %></p> '
].join(''));
