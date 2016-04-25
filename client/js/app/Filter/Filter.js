'use strict';

(function (This, app) {

    This.Filter = function () {
        var params = {
                state: 'in-process',
                areMyGroups: false,
                locations: []
            },
            groupList;

        app.mediator.subscribe('MyGroups: selected', function (value) {params.areMyGroups = value});
        app.mediator.subscribe('State: selected', function (value) {params.state = value});
        app.mediator.subscribe('Locations: selected', function (value) {params.locations = value});
        app.mediator.subscribe('GroupsListView: rendered', function () {
            params.state = 'in-process'; params.areMyGroups = false});



        this.split = function (collection) {
            if (collection === 'groupList') {

                groupList = store.groups;
                groupList = groupList.findGroupsByLocations(params.locations);
                groupList = groupList.findGroupsByState(params.state);

                if (params.areMyGroups) {
                    groupList = groupList.findMyGroups(app.user.getShortName());
                }
            }
            return groupList;
        };

        return this;
    };

})(CS, app);