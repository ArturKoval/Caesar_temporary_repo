'use strict';

var System = (function () {
    function _register (parent, modules) {
        modules.forEach(function (module) {
            parent[module] = {};
        });
	}

    function _setUpCollections () {
		// bulk load from server
		// init for requiered collections
        return this;
	}
	
    function _then (callback) {
		// call callback after readyState 4
	}
	
    return {
		register: _register,
		setUpCollections: setUpCollections,
		then: _then
	};
})();