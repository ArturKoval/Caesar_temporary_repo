templates.groupTeachersTpl = _.template([
    '<ul class="list">',
    '</ul>',
    '<div class="add-teacher"></div>'
].join(''));


templates.groupSelectTeacherTpl = _.template([
    '<div class="input-group">',
    '    <select name="teachers" id="teachers" class="form-control">',
    '    <% _(allTeachers).each(function(teacher) { %>',
    '       <option value="<%= teacher %>" <%= teacher === defaultTeacher ? \'selected\' : \'\' %>><%= teacher %></option>',
    '    <% }); %>',
    '    </select>',
    '    <span class="input-group-btn">',
    '       <button id="acceptSelect" class="btn btn-default" type="button">o</button>',
    '    </span>',
    '    <span class="input-group-btn">',
    '       <button id="cancelSelect" class="btn btn-default" type="button">x</button>',
    '    </span>',
    '</div>'
].join(''));

templates.groupMoreTeacherTpl = _.template('<span class="add-teacher-btn" tabindex="6">+ one more teacher</span>');

templates.groupTeacherTpl = _.template([
    '<% _(teachers).each(function(teacher) { %>',
    '<li>',
    '<%= teacher %>',
    '    <button class="remove-teacher" class="pull-right" data-teacher="<%= teacher %>" tabindex="5">x</button>',
    '</li>',
    '<% }); %>'
].join(''));