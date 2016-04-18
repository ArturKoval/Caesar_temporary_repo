'use strict';

templates.smallUserViewTpl = _.template([
    '<img class="img-circle" src="<%= photo %>" alt="<% print(lastName + \' \' + firstName) %>">'
].join(''));