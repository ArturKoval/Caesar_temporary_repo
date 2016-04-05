'use strict';

var System = (function () {
    function _register (parent, modules) {
        modules.forEach(function (module) {
            parent[module] = {};
        });
	}

    function _preload () {
        return this;
	}
	
    function _then (callback) {
    	console.log('**');
		var ajax = new XMLHttpRequest();

		ajax.addEventListener('readystatechange', function () {
			if (ajax.readyState === 4 && ajax.status === 200) {
				app.store = JSON.parse(ajax.responseText);
				callback();
			}
		}.bind(this), false);

		ajax.open("GET", '/preload', true);
		ajax.send();
	}
	
    return {
		register: _register,
		preload: _preload,
		then: _then
	};
})();