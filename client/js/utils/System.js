'use strict';

var System = (function () {
	var ajax = new XMLHttpRequest();

    function _register (parent, modules) {
        modules.forEach(function (module) {
            parent[module] = {};
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
				store.groups = response.groups;
				setLocations(response.locations);
				app.user = response.users;
				callback();
			}
		}.bind(this), false);
	}

	function setLocations (dataFromServer) {
		i.locations = [];
		dataFromServer.forEach(function (record) {
			i.locations.push(record.city);
		});
	}
    return {
		register: _register,
		preload: _preload,
		then: _then
	};
})();