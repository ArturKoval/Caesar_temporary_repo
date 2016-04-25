'use strict';

(function (This) {
    var formData;

    This.CreateEditView = Backbone.View.extend({
        tagName: 'section',

        className: 'backdrop',

        template: templates.groupEditCreate,

        events: {
            'click #save': 'save',
            'click #cancel': 'close',
            'change [name="startDate"]': 'setFinishDate',
            'change [name="direction"]': 'setFinishDate',
            'click .budget-option': 'setBudgetOwner',
            'click .calendar': 'showCalendar',
            'change [name="name"]': 'renderNameReturn'
        },

        initialize: function (model) {
            this.model = model || new This.Group();

            Backbone.Validation.bind(this);
        },

        render: function () {
            var model;

            this.teachers = this.model.get('teachers').slice();
            this.experts = this.model.get('experts').slice();

            this.teacherView = new This.TeacherView(this.teachers);
            this.expertView = new This.ExpertView(this.experts);

            model = _.extend({
                directions: i.directions,
                locations: store.locations.getNames(),
                stages: i.stages,
                isCreate: this.model.isNew(),
                defaultLocation: app.user.get('location')
            }, this.model.toClientJSON());

            this.$el.html(this.template(model));
            this.$el.find('#teachers').html(this.teacherView.render().$el);
            this.$el.find('#experts').html(this.expertView.render().$el);

            this.$nameEl = this.$el.find('[name=name]');
            this.$returnNameEl = this.$el.find('.return-name'); //удалить el
            this.$direction = this.$el.find('[name=direction]');
            this.$location = this.$el.find('[name=location]');

            this.$el.find('.date-picker').datepicker({
                dateFormat: 'mm/dd/yy'
            });

            if (model.isCreate) {
                this.addAlternativeEvents();

                this.showReturnName = _.once(function () {
                    this.$returnNameEl.show().on('click', _.bind(this.triggerName, this));
                });
            }

            $(document).on('keydown', keyEvent.bind(this));
            function keyEvent (event) {
                if (event.which === System.constants.ENTER) {
                    this.save();
                } else if (event.which === System.constants.ESC) {
                    this.close();
                }
            }

            return this;
        },

        save: function () {
            var errors = {};

            this.getFormData();

            errors = this.model.preValidate(formData);

            if (!_.isEmpty(errors)) {
                this.createHint(errors);
            } else {
                formData['startDate'] = moment(formData['startDate'], 'MM/DD/YYYY').format('X');
                formData['finishDate'] = moment(formData['finishDate'], 'MM/DD/YYYY').format('X');
                this.model.save(formData, {validate: false});
                app.mediator.publish('Groups: saved', this.model);
                store.groups.add(this.model);
                this.createFlashMessage();
                this.destroy();
            }
        },

        setFinishDate: function () {
            var startDate = this.$el.find('[name=startDate]').val();

            if (startDate) {
                var courseDurationWeeks,
                    courseDurationDays,
                    finishDate;

                if (['MQC', 'ISTQB'].indexOf(this.$direction.val()) !== -1) {
                    courseDurationWeeks = 9;
                } else {
                    courseDurationWeeks = 12;
                }

                finishDate = moment(startDate, 'MM/DD/YYYY');
                courseDurationDays = courseDurationWeeks * 7;
                finishDate.add(courseDurationDays, 'days');
                this.$el.find('[name=finishDate]').val(finishDate.format('MM/DD/YYYY'));
            }
        },

        setBudgetOwner: function (event) {
            this.$el.find('.budget-option').removeClass('active');
            $(event.target).addClass('active');
        },

        changeName: function () {
            var generatedName;

            generatedName = this.generateName();

            if (this.customName) {
                this.showReturnName();
                this.$returnNameEl.html(this.customName);
            }

            this.$nameEl.val(generatedName);

        },

        getFormData: function () {
            formData = {teachers: this.teachers, experts: this.experts};

            this.$el.find('[name=name], [name=startDate], [name=finishDate]').each(function (index, field) {
                formData[field.name] = field.value;
            });
            this.$el.find('[name=location] option:selected, [name=direction] option:selected, [name=stage] option:selected').each(function (index, field) {
                formData[$(field).data('name')] = field.value;
            });
            this.$el.find('.budget-option').each(function (index, button) {
                if ($(button).hasClass('active')) {
                    formData['budgetOwner'] = $(button).data('value');
                }
            });
        },

        createHint: function (errors) {
            var hints = [];

            _.each(errors, function (value, key) {
                hints.push({
                    name: key,
                    text: value
                });
            });

            app.mediator.publish('Message', {
                type: 'hints',
                $el: this.$el,
                hints: hints
            })
        },

        createFlashMessage: function () {
            var infoMessage,
                warning;

            if (this.model.isNew()) {
                infoMessage = 'Group ' + this.model.get('name') + ' was created';
            } else {
                infoMessage = 'Group ' + this.model.get('name') + ' was edited';
            }

            warning = this.createWarningMessage();

            if (warning) {
                app.mediator.publish('Message', {
                    type: 'flash-warning',
                    text: infoMessage + ', but ' + warning + ' are not specified'
                });
            } else {
                app.mediator.publish('Message', {
                    type: 'flash-info',
                    text: infoMessage
                });
            }
        },

        createWarningMessage: function () {
            var warningMessage;

            if (!formData.teachers.length && !formData.experts.length) {
                warningMessage = 'teachers and experts';
            } else if (!formData.teachers.length) {
                warningMessage = 'teachers';
            } else if (!formData.experts.length) {
                warningMessage = 'experts';
            }

            if (warningMessage !== '') {
                return warningMessage;
            }
        },

        generateName: function () {
            var directionName,
                locationName,
                groupNumber,
                location,
                acronym;

            locationName = this.$location.find('option:selected').val();
            directionName = this.$direction.find('option:selected').val();

            location = store.locations.getByName(locationName);
            groupNumber = location.get('lastGroupNumber') + 1;
            acronym = location.get('acronym');

            if (groupNumber < 100) {
                groupNumber = '0' + groupNumber;
            }

            return acronym + '-' + groupNumber + ' ' + directionName;
        },

        showCalendar: function (event) {
            $(event.target).siblings('.date-picker').focus();
        },

        addAlternativeEvents: function () {
            var currentName;

            this.$location.on('change', _.bind(this.changeName, this));
            this.$direction.on('change', _.bind(this.changeName, this));
            this.$nameEl.on('focus', _.bind(nameElOnFocus, this));
            this.$nameEl.on('blur', _.bind(nameElOnBlur, this));

            function nameElOnFocus () {
                currentName = this.$nameEl.val();
            }

            function nameElOnBlur () {
                if (currentName !== this.$nameEl.val()) {

                    if (!this.customName && this.$nameEl.val() && this.$direction.find('option:selected').val()) {
                        this.showReturnName();
                    }

                    this.customName = this.$nameEl.val();
                    this.$returnNameEl.html(this.generateName());
                }
            }
        },

        triggerName: function () {
            var inputValue = this.$nameEl.val();

            this.$nameEl.val(this.$returnNameEl.html());
            this.$returnNameEl.html(inputValue);
        },

        close: function () {
            this.destroy();
            app.mediator.publish('Groups: dialog-closed');
        },

        destroy: function () {
            $(document).off('keydown');
            this.teacherView.remove();
            this.expertView.remove();
            this.remove();
        }
    });
})(CS.Groups);