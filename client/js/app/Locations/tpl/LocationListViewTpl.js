templates.locationListViewTpl = _.template([
    '<div class="location-wrapper">',
        '<div>',
            '<ul>',
            '</ul>',
            '<div class="location-buttons">',
                '<button class="save disabled" disabled>',
                    '<i class="fa fa-check-circle-o fa-3x"></i>',
                '</button>',
                '<button class="cancel">',
                    '<i class="fa fa-times-circle-o fa-3x"></i>',
                '</button>',
            '</div>',
        '</div>',
    '</div>'
].join(''));