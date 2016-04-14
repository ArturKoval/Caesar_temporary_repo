'use strict';

(function (This) {

    This.Filter = function (collection, params) {
        var collection,
            key;

        function func(collection, params) {
            if (collection instanceof CS.Groups.GroupList) {

                for (key in params) {
                    if (key === 'state') {
                        if (params[key] === 'planned') {
                            collection = collection.findGroupsByState('planned');
                        }
                        if (params[key] === 'in-process' || params[key] === 'offering') {
                            collection = collection.findGroupsByState('in-process');
                        }
                        if (params[key] === 'finished') {
                            collection = collection.findGroupsByState('finished');
                        }
                    }

                    if (key === 'areMyGroups') {
                        if (params[key]) {
                            collection = collection.findMyGroups(app.user.getShortName());
                        }
                    }
                }
            }
            return collection;
        }
        return func;
    };

})(app);