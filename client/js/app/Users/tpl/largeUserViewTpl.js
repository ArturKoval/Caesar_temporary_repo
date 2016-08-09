'use strict';

templates.largeUserViewTpl = _.template([
    '<div class="profile-container">',
        '<button class="btn-edit" title="Edit profile">',
            '<i class="fa fa-cog fa-2x"></i>',
        '</button>',
        '<div class="user-info">',
            '<% if (photo) { %>',
                '<img class="photo img-circle" src="<%= photo %>" alt="<% print(lastName + \' \' + firstName) %>">',
            '<% } else { %>',
                '<img class="photo img-circle" src="/img/default-photo.png" alt="<% print(lastName + \' \' + firstName) %>">',
            '<% } %>',
            '<p class="name"><%= firstName %></br>',
                '<%= lastName %></p>',
            '<p class="role"><%= role %></p>',
        '</div>',
        '<a class="logout" href="http://localhost:3000/logout">',
            '<i class="fa fa-sign-out fa-3x"></i>',
        '</a>',
    '</div>'
].join(''));
