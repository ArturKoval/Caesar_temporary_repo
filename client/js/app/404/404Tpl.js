templates.ErrorPageTpl = _.template([
    '<div class="error-container">',
        '<div class="error-logo">',
            '<img src="/img/404.png">',
        '</div>',
        '<div class="error-message">',
            '<span><%= message %></span>',
        '</div>',
    '</div>'
].join(''));