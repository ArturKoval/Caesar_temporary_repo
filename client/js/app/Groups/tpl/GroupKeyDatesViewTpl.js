templates.groupKeyDatesViewTpl = _.template([
    '<thead>',
        '<tr>',
            '<% for (var key in keyDates) {%>',
                '<th><%= key %></th>',
            '<% } %>',
        '</tr>',
    '</thead>',
    '<tbody>',
        '<tr>',
            '<% for (key in keyDates) { %>',
                '<td><%= keyDates[key] %></td>',
            '<% } %>',
        '</tr>',
    '</tbody>'
].join(''));