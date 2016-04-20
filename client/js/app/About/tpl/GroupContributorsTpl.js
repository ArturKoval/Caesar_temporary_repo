templates.GroupContributorsTpl = _.template([
	'<div class = "contributorsView">',
	'<div class="col-md-6"><img src="<%= logo %>" alt="logo"></div>',
	'<div class="col-md-6"><p><%= nickname %></p></div>',
	'</div>'
].join(''));