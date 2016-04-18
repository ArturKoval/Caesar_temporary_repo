'use strict';

(function (This, i) {
    This.Group = Backbone.Model.extend({ 
        urlRoot: '/groups',
        
        defaults: function () {
            return {
                name: '',
                location: '',
                budgetOwner: '',
                direction: '',
                startDate: '',
                finishDate: '',
                teachers: [],
                experts: [],
                stage: 'boarding'
            };
        },
        
        isMyTeacher: function (teacher) {
            return this.get('teachers').indexOf(teacher) > -1;
        },
        
        isMyStage: function (stage) {
            return this.get('stage') === stage;
        },
        
        isMyLocation: function (locations) {
            return locations.indexOf(this.get('location')) > -1;
        },

        isMyState: function (state) {
            var result;

            if (state === 'planned') {
                result = this.get('stage') === 'boarding' || this.get('stage') === 'before-start';
            }

            if (state === 'in-process') {
                result = this.get('stage') === 'in-process' || this.get('stage') === 'offering';
            }

            if (state === 'finished') {
                result = this.get('stage') === 'finished';
            }
            return result;

        },

        validation: {
            name: [{
                minLength: 4
            }, {
                maxLength: 20
            }, {
                pattern: /^[a-z0-9 \-\/]+$/i,
                msg: 'Please enter valid name. Allowed symbols: english alpabeth, digits, "space", "/", "-"'
            }],

            stage: function (stage) {
                if (i.stages.indexOf(stage) === -1) {
                   return 'Direction must be one of: ' + i.stages.join(', ');
                }
            },

            direction: function (direction) {
                if (i.directions.indexOf(direction) === -1) {
                   return 'Direction must be one of: ' + i.directions.join(', ');
                }
            },

            location: function (location) {
                if (i.locations.indexOf(location) === -1) {
                   return 'Location must be one of: ' + i.locations.join(', ');
                }
            },

            startDate: {
                // fix after debug
                // pattern: /^\d{4}\-\d{2}\-\d{2}$/
                required: true 
            },

            finishDate: {
                // fix after debug 
                // pattern: /^\d{4}\-\d{2}\-\d{2}$/
                required: true 
            },

            teachers: function (teachers) {
                var isTeachersValid;

                isTeachersValid = teachers.every(function (teacher) {
                    return (i.teachers.indexOf(teacher) !== -1);
                });

                if (!isTeachersValid) {
                    return 'Teachers fields are invalid';
                }
            },

            experts: function (experts) {
                var isExpertsValid,
                    regexp = /^[a-z \-\.]{5,25}$/i;

                isExpertsValid = experts.every(function (expert) {
                    return regexp.test(expert);
                });

                if (!isExpertsValid) {
                    return 'Experts fields are invalid';
                }
            }
        }
    });
})(CS.Groups, i);