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
                result = this.get('stage') === 'boarding' || this.get('stage') === 'planned';
            }

            if (state === 'in-process') {
                result = this.get('stage') === 'in-process' || this.get('stage') === 'offering' || this.get('stage') === 'before-start';
            }

            if (state === 'finished') {
                result = this.get('stage') === 'finished';
            }

            return result;
        },

        generateName: function (location, direction) {
            var groupNumber = location.get('lastGroupNumber') + 1,
                acronym = location.get('acronym');

            if (groupNumber < 100) {
                groupNumber = '0' + groupNumber;
            }

            return acronym + '-' + groupNumber + ' ' + direction;
        },

        validation: function () {
            var dateFormat = 'MM/DD/YYYY';

            return {
                name: [{
                    minLength: 4
                }, {
                    maxLength: 20
                }, {
                    pattern: /^[a-z0-9 \-\/]+$/i,
                    msg: 'Please enter valid name. Allowed symbols: english alpabeth, digits, "space", "/", "-".'
                }],

                stage: function (stage) {
                    if (i.stages.indexOf(stage) === -1) {
                        return 'Direction must be one of: ' + i.stages.join(', ') + '.';
                    }
                },

                direction: function (direction) {
                    if (i.directions.indexOf(direction) === -1) {
                        return 'Direction must be one of: ' + i.directions.join(', ') + '.';
                    }
                },

                location: function (location) {
                    var locationNames = store.locations.getNames();

                    if (locationNames.indexOf(location) === -1) {
                        return 'Location must be one of: ' + locationNames.join(', ') + '.';
                    }
                },

                startDate: function (value, attr, computedState) {
                    var finishDateTime = moment(computedState.finishDate, dateFormat),
                        earliestDate = '01/01/2005',
                        earliestStartDate = moment(earliestDate, dateFormat),
                        startDateTime = moment(value, dateFormat),
                        msg = '';

                    if (!value) {
                        msg = 'Start Date is required!';
                    } else if (!moment(value, dateFormat, true).isValid()) {
                        msg = 'Wrong date format!';
                    } else if (startDateTime.isSameOrBefore(earliestStartDate)) {
                        msg = 'Start date should be greater than ' + earliestDate;
                    } else if (startDateTime.isSameOrAfter(finishDateTime)) {
                        msg = 'Start date should be less than Finish date!';
                    }

                    if (msg) {
                        return msg;
                    }
                },

                finishDate: function (value, attr, computedState) {
                    var startDateTime = moment(computedState.startDate, dateFormat),
                        finishDateTime = moment(value, dateFormat),
                        msg = '';

                    if (!value) {
                        msg = 'Finish date is required!';
                    } else if (!moment(value, dateFormat, true).isValid()) {
                        msg = 'Wrong date format!';
                    } else if (finishDateTime.isSameOrBefore(startDateTime)) {
                        msg = 'Finish date should be greater than Start date!';
                    }

                    if (msg) {
                        return msg;
                    }
                },

                teachers: function (teachers) {
                    var isTeachersValid;

                    isTeachersValid = teachers.every(function (teacher) {
                        return (i.teachers.indexOf(teacher) !== -1);
                    });

                    if (!isTeachersValid) {
                        return 'Teachers fields are invalid!';
                    }
                },

                experts: function (experts) {
                    var isExpertsValid,
                        regexp = /^[a-z \-\.]{5,25}$/i;

                    isExpertsValid = experts.every(function (expert) {
                        return regexp.test(expert);
                    });

                    if (!isExpertsValid) {
                        return 'Experts fields are invalid!';
                    }
                }
            };
        }
    });
})(CS.Groups, i);