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

        app.mediator.subscribe('Locations: selected', setDefault);
        app.mediator.subscribe('MyGroups: selected', function (value) {groupListParams.areMyGroups = value});
        app.mediator.subscribe('State: selected', function (value) {groupListParams.state = value});
        app.mediator.subscribe('GroupList paginator: page size defined', onPageSelected);
        app.mediator.subscribe('Locations: selected', function (value) {groupListParams.locations = value});
        app.mediator.subscribe('GroupList paginator: page-selected', function (value) {groupListParams.page = value;});
        app.mediator.subscribe('GroupsListView: rendered', function () {groupListParams.state = 'in-process'; groupListParams.areMyGroups = false});

        function onPageSelected (value) {
            groupListParams.pageSize = value;
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