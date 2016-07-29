templates.paginatorTpl = _.template([
    '<div class="left-nav">',
    '<i class="fa fa-caret-left" aria-hidden="true"></i>',
    '</div>',
    '<div class="page-nav"></div>',
    '<div class="right-nav">',
    '<i class="fa fa-caret-right" aria-hidden="true"></i>',
    '</div>'
].join(''));

templates.navTpl = _.template([
    '<%= page %>' + ' / ' + '<%= lastPage %>'
].join(''));

