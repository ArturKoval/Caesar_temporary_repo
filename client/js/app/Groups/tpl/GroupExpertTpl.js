templates.groupExpertsTpl = _.template([
    '<ul class="listExpert">',
    '</ul>',
    '<div class="add-expert clearfix"></div>'
].join(''));


templates.groupSelectExpertTpl = _.template([
    '<div name="groupSelectExpert">',
    '    <input name="expert" class="form-control pull-left" tabindex="16">',
    '    <span class="fa fa-times-circle-o fa-2x pull-right small-btn" id="cancelInput" tabindex="18"></span>',
    '    <span class="fa fa-check-circle-o fa-2x pull-right small-btn" id="acceptInput" tabindex="17"></span>',
    '</div>'
].join(''));

templates.groupMoreExpertTpl = _.template('<span class="add-expert-btn"  tabindex="15">+ one more expert</span>');

templates.groupExpertTpl = _.template([
    '<% _(experts).each(function(expert) { %>',
    '<li>',
    '    <span class="list-item"><%= expert %></span>',
    '    <span class="remove-expert fa fa-times-circle-o fa-2x small-btn" data-expert="<%= expert %>"  tabindex="14"></span>',
    '</li>',
    '<% }); %>'
].join(''));