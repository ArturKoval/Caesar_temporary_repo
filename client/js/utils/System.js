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
				app.store = JSON.parse(ajax.responseText);
				callback();
			}
		}.bind(this), false);
	}
	
    return {
		register: _register,
		preload: _preload,
		then: _then
	};
})();