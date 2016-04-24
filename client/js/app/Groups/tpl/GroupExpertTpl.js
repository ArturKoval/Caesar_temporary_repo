templates.groupExpertsTpl = _.template([
    '<ul class="listExpert">',
    '</ul>',
    '<div class="add-expert"></div>'
].join(''));


templates.groupSelectExpertTpl = _.template([
    '<div class="input-group">',
    '    <input name="experts" class="form-control">',
    '    <span class="input-group-btn">',
    '       <button id="acceptInput" class="btn btn-default" type="button">Ok</button>',
    '    </span>',
    '    <span class="input-group-btn">',
    '       <button id="cancelInput" class="btn btn-default" type="button">Cancel</button>',
    '    </span>',
    '</div>'
].join(''));

templates.groupMoreExpertTpl = _.template('<span class="add-expert-btn"  tabindex="12">+ one more expert</span>');

templates.groupExpertTpl = _.template([
    '<% _(experts).each(function(expert) { %>',
    '<li>',
    '<%= expert %>',
    '    <button class="remove-expert" class="pull-right" data-expert="<%= expert %>"  tabindex="11">x</button>',
    '</li>',
    '<% }); %>'
].join(''));