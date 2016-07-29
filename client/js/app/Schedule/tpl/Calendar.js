templates.calendar = _.template([
    '<div class="calendar"> </div> <div class="month-toggle"> <i class="fa fa-caret-left prevMonth" aria-hidden="true"></i>',
    '<p> <%= month %></p>',
    '<i class="fa fa-caret-right nextMonth" aria-hidden="true"></i> </div>'
].join(''));


templates.dayNames = _.template([
    '<table class="calendar-table"><tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr><tr weekNum =0>'
].join(''));

templates.weekRow = _.template([
    '</tr><tr weekNum = <%= weekNum %> >'
].join(''));

templates.day = _.template([
    '<td><%= day %></td>'
].join(''));




