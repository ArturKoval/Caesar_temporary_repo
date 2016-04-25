'use strict';
var Rotor = require('../../../libs/rotor/rotor');

var Course = Rotor.Model.extend({
    name: 'locations',

    defaults: {
        acronym: '',
        name: '',
        teachers: '',
        groups: '',
        lastGroupNumber: 0
    }
});

module.exports = Course;