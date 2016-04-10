'use strict';

(function (This)  {
    
   This.Filter = function (collection, params) {
    var collection = collection;
        if (collection instanceof CS.Groups.GroupList) {

            for (var key in params) {
                console.log(key);
                if (key === 'stage')  {
                    collection = collection.findGroupsByStage(params[key])
                }

                if (key === 'areMyGroups') {
                    if (params[key]) {
                    collection = collection.findMyGroups(app.user.firstName +' ' + app.user.lastName);
                }}
            }
        }
        return collection;
    }

})(app);