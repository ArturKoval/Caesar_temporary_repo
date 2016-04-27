'use strict';

templates.ItemContextMenuTpl = _.template([
    '<button title="<%= description %>">',
        '<i class="<%= icon %>"></i>',
    '</button>'
].join(''));