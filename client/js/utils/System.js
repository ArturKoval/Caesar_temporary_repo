'use strict';

var System = (function () {
    var ajax = new XMLHttpRequest(),
        _constants = {
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

    function _preload () {
        ajax.open("GET", '/preload', true);
        ajax.send();

        return this;
    }

    function _then (callback) {
        ajax.addEventListener('readystatechange', function () {
            if (ajax.readyState === 4 && ajax.status === 200) {
                var response = JSON.parse(ajax.responseText);

                store.groups = new CS.Groups.GroupList(response.groups);
                store.locations = new CS.Locations.LocationList(response.locations);
                app.user = new CS.User.User(response.users);
                setInfoBlocks(response);

                callback();
            }
        }.bind(this), false);
    }

    function setInfoBlocks (response) {
        _registerArray(i, ['teachers', 'directions', 'roles', 'stages']);

        // response.teachers.forEach(function (record) {
        //     i.teachers.push(record.name);
        // });

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
            // fetch implementation here
    }

    return {
        constants: _constants,
        register: _register,
        preload: _preload,
        then: _then,
        setInfoBlock: _setInfoBlock,
        startWebSocket: _startWebSocket
    };
})();
