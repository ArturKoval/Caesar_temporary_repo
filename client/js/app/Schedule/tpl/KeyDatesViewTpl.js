templates.keyDatesViewTpl = _.template([
        '<td class="group-name"><%= groupName %></td>',
        '<td class="key-date"><%= keyDates.start %></td>',
        '<td class="key-date"><%= keyDates.demo1 %></td>',
        '<td class="key-date"><%= keyDates.demo2 || \'\' %></td>',
        '<td class="key-date"><%= keyDates.offering || \'\' %></td>',
        '<td class="key-date"><%= keyDates.finish %></td>'
].join(''));