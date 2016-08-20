templates.studentListViewTpl = _.template([
    '<thead>',
        '<tr>',
            '<th class="name">Name</th>',
            '<th>Photo</th>',
            '<th class="range">English level</th>',
        '</tr>',
    '</thead>',
    '<tbody class = "tableBodyStudents">',
        '<% _.each(students, function (student) { %>',
            '<tr>',
            '<td name="studName"><%= student.name %></td>',
            '<% if ("avatar" in student ) { %>',
                '<td><%= student.avatar %></td>',
            '<% } else { %>',
                '<td><img class="photo img-circle" src="/img/default-photo.png"/></td>',
            '<% } %>',
            '<td><%= student.englishLevel %></td>',
            '</tr>',
            '<% }); %>',
    '</tdoby>',
].join(''));

templates.studentListModalViewTpl = _.template([
    '<section class="modal-window modal_editStudentlist">',
        '<section class="form-inline form-wrapper container">',
            '<div class="header-modal-editStudentlist">',
                '<span>Student list</span>',
                '<button class = "fa fa-plus-square-o fa-4x createStudent"></button>',
            '</div>',
            '<table class="students_list">',
            '<thead>',
                '<tr>',
                    '<td>Name</td>',
                    '<td>Photo</td>',
                    '<td>English level</td>',
                    '<td></td>',
                    '<td></td>',
                    '<td></td>',
                '</tr>',
            '</thead>',
            '<tbody class = "tableBodyStudents">',
                '<% _.each(students, function (student) { %>',
                    '<tr>',
                    '<td name="studName"><%= student.name %></td>',
                    '<% if ("avatar" in student ) { %>',
                        '<td><%= student.avatar %></td>',
                    '<% } else { %>',
                        '<td><img class="photo img-circle" src="/img/default-photo.png"/></td>',
                    '<% } %>',
                    '<td><%= student.englishLevel %></td>',
                    '<td>CV<img class = "cvDownload" src="" alt=""/></td>',
                    '<td>Edit<img class = "editStudent" src="" alt="" /></td>',
                    '<td>Delete<img class = "deleteStudent" src="" alt="" /></td>',
                    '</tr>',
                    '<% }); %>',
            '</tdoby>',
            '</table>',
            '<button class = "fa fa-times-circle-o fa-3x btn-icon exit closeModalWindow"></button>',
        '</section>',
    '</section>'
].join(''));