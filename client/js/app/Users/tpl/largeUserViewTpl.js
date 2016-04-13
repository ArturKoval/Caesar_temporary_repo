'use strict';

templates.largeUserViewTpl = _.template([
    '<div class="profile-container">', 
        '<button class="btn-edit" title="Edit profile">',
            '<i class="fa fa-cog fa-2x"></i>',
        '</button>',
        '<div class="user-info">',
            '<img class="photo" src="<%= photo %>" alt="<% print(lastName + \' \' + firstName) %>">',
            '<p class="name"><%= firstName %></br>',
                '<%= lastName %></p>',
            '<p class="role"><%= role %></p>',
        '</div>',
        '<button class="btn-logout" title="Logout">',
            '<i class="fa fa-sign-out fa-3x"></i>',
        '</button>',
    '</div>'
].join(''));
