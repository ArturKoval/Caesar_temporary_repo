'use strict';

templates.smallUserViewTpl = _.template([
    '<img src="<%= photo %>" alt="<% print(lastName + \' \' + firstName) %>">'
].join(''));