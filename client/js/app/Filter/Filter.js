'use strict';

(function (This, app) {

    This.Filter = function () {
        var params = {
                state: 'in-process',
                areMyGroups: false,
                locations: [app.user.get('location')]
            },
            groupList;

        app.mediator.subscribe('MyGroups: selected', function (value) {params.areMyGroups = value});
        app.mediator.subscribe('State: selected', function (value) {params.state = value});
        app.mediator.subscribe('Locations: selected', function (value) {params.locations = value});

        this.split = function (collection) {
            if (collection === 'groupList') {

                groupList = store.groups;
                groupList = groupList.findGroupsByLocations(params.locations);

                if (params.state === 'planned') {
                    groupList = groupList.findGroupsByState('planned');
                }
                if (params.state === 'in-process') {
                    groupList = groupList.findGroupsByState('in-process');
                }
                if (params.state === 'finished') {
                    groupList = groupList.findGroupsByState('finished');
                }
                if (params.areMyGroups) {
                    groupList = groupList.findMyGroups(app.user.getShortName());
                }
            }
            return groupList;
        };

        return this;
    };

})(CS, app);