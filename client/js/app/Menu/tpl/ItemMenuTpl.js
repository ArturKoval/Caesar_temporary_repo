templates.ItemMenuTpl = _.template([	
	'<i class="<%= icon %>" aria-hidden="true"></i>',
	'<p><%= description %></p>'	
].join(''));