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
                app.user = new CS.User.User(response.users);
                setInfoBlocks(response);

                callback();
            }
        }.bind(this), false);
    }

    function setInfoBlocks (response) {
        _registerArray(i, ['locations', 'teachers', 'directions', 'roles', 'stages']);

        response.locations.forEach(function (record) {
            i.locations.push(record.city);
        });

        response.teachers.forEach(function (record) {
            i.teachers.push(record.name);
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

    function _setupSubscribes () {
        var subscribes = _.result(this, 'subscribes'),
            method;

        for (var key in subscribes) {
            method = subscribes[key];
            if (!_.isFunction(method)) {
                method = this[method];
            }
            this.mediator.subscribe(key, _.bind(method, this));
        }
    }

    return {
        setupSubscribes: _setupSubscribes,
        constants: _constants,
        register: _register,
        preload: _preload,
        then: _then
    };
})();
