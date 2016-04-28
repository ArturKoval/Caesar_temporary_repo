templates.keyDatesViewTpl = _.template([
        '<td><%= groupName %></td>',
        '<td><%= keyDates.start %></td>',
        '<td><%= keyDates.demo1 %></td>',
        '<td><%= keyDates.demo2 || \'\' %></td>',
        '<td><%= keyDates.offering || \'\' %></td>',
        '<td><%= keyDates.finish %></td>'
].join(''));