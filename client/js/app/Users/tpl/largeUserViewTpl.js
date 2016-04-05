'use strict';

templates.largeUserViewTpl = _.template([
    '<button class="btn-edit" title="Edit profile">',
        '<i class="fa fa-cog fa-2x"></i>',
    '</button>',
    '<div class="user-info">',
        '<img class="photo" src="<%= photo %>" alt="<%= name %>">',
        '<p class="name"><%= name %></p>',
        '<p class="role"><%= role %></p>',
    '</div>',
    '<button class="btn-logout" title="Logout">',
        '<i class="fa fa-sign-out fa-3x"></i>',
    '</button>',
].join(''));

