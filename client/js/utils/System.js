'use strict';

var System = (function () {
            var ajax = new XMLHttpRequest();

    var _constants = {
            ESC: 27,
            ENTER: 13
        };

    function _register (parent, modules) {
        modules.forEach(function (module) {
            parent[module] = {};
        });
    }

    function _registerArray (parent, properties) {
        properties.forEach(function (array) {
            parent[array] = [];
        });
    }


    function _Request () {
        var ajax = new XMLHttpRequest();
        
        this.send = function ({ URL:path='/preload'} = {}) {
            ajax.open("GET", path, true);
            ajax.send();

            return this;
        };

        this.then = function (callback, options) {
            ajax.addEventListener('readystatechange', function () {
                if (ajax.readyState === 4 && ajax.status === 200) {
                    var response = JSON.parse(ajax.responseText);

                    for (var key in options) {
                        if (key === 'users') {
                            app.user = new options[key](response[key]);  

                            setInfoBlocks(response);
                        } else if (key === 'students') {
                            store[key] = new options[key](response);
                        } else {
                            store[key] = new options[key](response[key]);
                        }
                    }

                    if (typeof callback === 'function') {
                        callback();
                    }
                }

                return this;
            }.bind(this), false);
        };

        return this;
    }


    // function _preload ({ URL:path='/preload'} = {}) {
    //     ajax.open("GET", path, true);
    //     ajax.send();

    //     return this;
    // }

    // function _then (callback) {
    //     ajax.addEventListener('readystatechange', function () {
    //         if (ajax.readyState === 4 && ajax.status === 200) {
    //             var response = JSON.parse(ajax.responseText);

    //             if (response.groups) {
    //                 store.groups = new CS.Groups.GroupList(response.groups);
    //             }

    //             if (response.locations) {
    //                 store.locations = new CS.Locations.LocationList(response.locations);
    //             }

    //             if (response.users) {
    //                 app.user = new CS.User.User(response.users);
    //             }

    //             console.dir(response);

    //             setInfoBlocks(response);

    //             if (typeof callback === 'function') {
    //                 callback();
    //             }
    //         }

    //         return this;
    //     }.bind(this), false);
    // }

    function setInfoBlocks (response) {
        _registerArray(i, ['englishLevels', 'teachers', 'directions', 'roles', 'stages']);

        response.englishLevels.forEach(function (record) {
             i.englishLevels.push(record.name);
        });

        response.directions.forEach(function (record) {
            i.directions.push(record.name);
        });

        response.roles.forEach(function (record) {
            i.roles.push(record.name);
        });

        response.stages.forEach(function (record) {
            i.stages.push(record.name);
        });
    }

    function _setInfoBlock (name, where) {
        i[where].push(name);
    }

    function _startWebSocket () {
        var socket = new WebSocket("ws://localhost:8080");

        socket.onmessage = function(event) {
            var data = event.data,
                collection = data.collection;
                console.log(event.data);
        };
    }

    return {
        constants: _constants,
        register: _register,
        // preload: _preload,
        // then: _then,
        setInfoBlock: _setInfoBlock,
        startWebSocket: _startWebSocket,
        Request: _Request
    };
})();
