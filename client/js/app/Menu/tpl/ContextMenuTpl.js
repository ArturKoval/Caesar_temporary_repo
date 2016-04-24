'use strict';

templates.contextMenuTpl = _.template([
    '<div class="contextMenu">', 
        '<div class="controls">', 
            '<button class="addBtn" title="Add">',
                '<i class="fa fa-plus-square-o fa-4x" aria-hidden="true"></i>',
            '</button>',
            '<br>',
            '<br>',

            '<button class="searchBtn" title="Search">',
                '<i class="fa fa-search fa-4x" aria-hidden="true"></i>',
            '</button>',
            '<br>',
            '<br>',

            '<button class="editContextBtn" title="Edit">',
                '<i class="fa fa-cog fa-4x"></i>',
            '</button>',
            '<br>',
            '<br>',

            '<button class="deleteBtn" title="Delete">',
                '<i class="fa fa-trash-o fa-4x" aria-hidden="true"></i>',
            '</button>',
        '</div>',
    '</div>'
].join(''));
