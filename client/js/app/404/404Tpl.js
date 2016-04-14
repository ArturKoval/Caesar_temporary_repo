templates.ErrorPageTpl = _.template([
    '<div class="error404">',
        '<img src="/img/404.png"></img>',
        '<div><span><%= message %></span></div>',
    '</div>'
].join(''));