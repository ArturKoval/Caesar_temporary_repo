templates.timeBarTpl = _.template([
    '<span class="time"><%= time %></span>',
    '<div class="today">',
        '<span><%= day %></span>',
        '<span><%= date %></span>',
    '</div>'
].join(''));