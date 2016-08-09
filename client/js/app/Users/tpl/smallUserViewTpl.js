'use strict';

templates.smallUserViewTpl = _.template([
	'<% if (photo) { %>',
    	'<img class="img-circle" src="<%= photo %>" alt="<% print(lastName + \' \' + firstName) %>">',
    '<% } else { %>',
    	'<img class="img-circle" src="/img/default-photo.png" alt="<% print(lastName + \' \' + firstName) %>">',
    '<% } %>'
].join(''));