templates.groupDeleteViewTpl = _.template([
    '<p>Group <%= name %> will be deleted.<br>',
    'Are you sure?</p>',
    '<button class="btn-delete">Delete</button>',
    '<button class="btn-cancel">Cancel</button>'
].join(''));