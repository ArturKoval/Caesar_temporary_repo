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

        toJSON: function () {
            var result = _.clone(this.attributes);

            result.startDate = this.get('startDate') ? moment(this.get('startDate'),'X').format('MM/DD/YYYY') : '';
            result.finishDate = this.get('finishDate') ? moment(this.get('finishDate'),'X').format('MM/DD/YYYY') : '';

            return result;
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

        validation: function () {
            var DATE_FORMAT = 'MM/DD/YYYY',
                MIN_NAME_LENGTH = 4,
                MAX_NAME_LENGTH = 21;

            return {
                name: function (name, attributeName, attributes) {
                    var nameLength = name.length,
                        regexp = /^[a-z0-9 \-\/\+\.\#\(\)]+$/i,
                        msg = '';

                    if (nameLength < MIN_NAME_LENGTH) {
                        msg = 'Name must be at least 4 characters!';
                    } else if (nameLength > MAX_NAME_LENGTH) {
                        msg = 'Name must be at most 21 characters!';
                    } else if (!regexp.test(name)) {
                        msg = 'Invalid name! Allowed symbols: a-z, 0-9, "space", "/", "-", "+", ".", "#", "(", ")".';
                    } else if (!store.groups.isNameUnique(name)) {
                        var id = attributes.id;

                        if (id) {
                            if (name !== store.groups.findById(id).get('name')) {
                                msg = 'Name should be unique!';
                            }
                        } else {
                            msg = 'Name should be unique!';
                        }
                    }

                    if (msg) {
                        return msg;
                    }
                },

                stage: function (stage) {
                    if (i.stages.indexOf(stage) === -1) {
                        return 'Wrong stage!';
                    }
                },

                direction: function (direction) {
                    if (i.directions.indexOf(direction) === -1) {
                        return 'Wrong direction!';
                    }
                },

                location: function (location) {
                    var locationNames = store.locations.getNames();

                    if (locationNames.indexOf(location) === -1) {
                        return 'Wrong location!';
                    }
                },

                startDate: function (startDate, attributeName, attributes) {
                    var finishDateTime = moment(attributes.finishDate, DATE_FORMAT),
                        earliestDate = '01/01/2005',
                        earliestStartDate = moment(earliestDate, DATE_FORMAT),
                        startDateTime = moment(startDate, DATE_FORMAT),
                        msg = '';

                    if (!startDate) {
                        msg = 'Start Date is required!';
                    } else if (!moment(startDate, DATE_FORMAT, true).isValid()) {
                        msg = 'Wrong date format!';
                    } else if (startDateTime.isSameOrBefore(earliestStartDate)) {
                        msg = 'Start date should be after ' + earliestDate + '!';
                    } else if (startDateTime.isSameOrAfter(finishDateTime)) {
                        msg = 'Start date should be before Finish date!';
                    }

                    if (msg) {
                        return msg;
                    }
                },

                finishDate: function (finishDate, attributeName, attributes) {
                    var startDateTime = moment(attributes.startDate, DATE_FORMAT),
                        finishDateTime = moment(finishDate, DATE_FORMAT),
                        msg = '';

                    if (!finishDate) {
                        msg = 'Finish date is required!';
                    } else if (!moment(finishDate, DATE_FORMAT, true).isValid()) {
                        msg = 'Wrong date format!';
                    } else if (finishDateTime.isSameOrBefore(startDateTime)) {
                        msg = 'Finish date should be after Start date!';
                    }

                    if (msg) {
                        return msg;
                    }
                },

                teachers: function (teachers) {
                    var isTeachersValid = false;

                    isTeachersValid = teachers.every(function (teacher) {
                        return (i.teachers.indexOf(teacher) !== -1);
                    });

                    if (!isTeachersValid) {
                        return 'Teachers fields are invalid!';
                    }
                },

                experts: function (experts) {
                    var regexp = /^[a-z \-\.]{5,25}$/i,
                        isExpertsValid = false;

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