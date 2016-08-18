'use strict';

(function (This, app) {

    This.Filter = function () {
        var groupListParams = {
                state: 'in-process',
                areMyGroups: false,
                locations: [],
                page: 0,
                lastPage: 0,
                pageSize: 10
            },
            groupList;

        app.mediator.subscribe('GroupList paginator: page size defined', onPageChange);
        app.mediator.subscribe('GroupList paginator: page-selected', onPageSelected);
        app.mediator.subscribe('Locations: selected', onLocationsSelect);
        app.mediator.subscribe('Locations student: selected', onLocationsSelect);
        app.mediator.subscribe('MyGroups: selected', onMyGroups);
        app.mediator.subscribe('State: selected', onStateChange);

        function onPageSelected (value) {
            groupListParams.page = value;
        }

        function onPageChange (value) {
            groupListParams.pageSize = value;
        }

        function onStateChange (value) {
            groupListParams.state = value;
        }

        function onMyGroups (value) {
            groupListParams.areMyGroups = value;
        }

        function onLocationsSelect (value) {
            setDefault();

            groupListParams.locations = value;
        }

        this.split = function (collection) {
            if (collection === 'groupList') {
                groupList = store.groups;
                groupList = groupList.findGroupsByLocations(groupListParams.locations);
                groupList = groupList.findGroupsByState(groupListParams.state);

                if (groupListParams.areMyGroups) {
                    groupList = groupList.findMyGroups(app.user.getShortName());
                }
            }

            groupList = splitToPages(groupList);

            return groupList;
        };

        function splitToPages (collection) {
            var chunk;

            var tmp = collection.slice();
            var pageElems = [];
            while (tmp.length > 0) {
                chunk = tmp.splice(0, groupListParams.pageSize);
                pageElems.push(chunk);
            }

            groupListParams.lastPage = pageElems.length;
            app.mediator.publish('GroupList paginator: pages defined', groupListParams);
            return pageElems[groupListParams.page];
        }

        function setDefault (){
            groupListParams.state = 'in-process';
            groupListParams.areMyGroups = false;
            groupListParams.locations = store.groups.findGroupsByLocations(app.user.get('location'));
            groupListParams.page = 0;
            groupListParams.lastPage = 0;
            groupListParams.pageSize = 10
        }

        return this;
    };

})(CS, app);