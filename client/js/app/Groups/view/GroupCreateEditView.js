'use strict';

(function (This) {

    This.CreateEditView = Backbone.View.extend({
        tagName: 'section',

        className: 'backdrop',

        template: templates.groupEditCreate,

        events: {
            'click #save': 'save',
            'click #cancel': 'close',
            'change [name="startDate"]': 'setFinishDate',
            'change [name="direction"]': 'setFinishDate',
            'click .budget-option': 'setBudgetOwner'
        },

        initialize: function (model) {
            this.model = model || new This.Group();

            Backbone.Validation.bind(this);
        },

        render: function () {
            var teacherView,
                expertView,
                model;

            this.teachers = this.model.get('teachers');
            this.experts = this.model.get('experts');

            teacherView = new This.TeacherView(this.teachers);
            expertView = new This.ExpertView(this.experts);

            model = _.extend({
                directions: i.directions,
                locations: i.locations,
                stages: i.stages,
                isCreate: this.model.isNew(),
                defaultLocation: app.user.get('location')
            }, this.model.toJSON());

            this.$el.html(this.template(model));
            this.$el.find('#teachers').html(teacherView.render().$el);
            this.$el.find('#experts').html(expertView.render().$el);

            $(document).on('keydown', keyEvent.bind(this));
            function keyEvent (event) {

                if (event.which === ENTER) {
                    this.save();
                } else if (event.which === ESC) {
                    this.close();
                }
            }

            return this;
        },

        setFinishDate: function () {
            var startDate = this.$el.find('[name=startDate]').val();

            if (startDate) {
                var finishDate,
                    courseDuration;

                if (this.$el.find('[name=direction]').val() === 'MQC') {
                    courseDuration = 9 * 7;
                } else {
                    courseDuration = 12 * 7;
                }

                finishDate = new Date(startDate);

                finishDate.setDate(finishDate.getDate() + courseDuration);
                this.$el.find('[name=finishDate]').val(finishDate.toISOString().split('T')[0]);
            }
        },

        setBudgetOwner: function (event) {
            this.$el.find('.budget-option').removeClass('active');
            $(event.target).addClass('active');
        },

        save: function () {
            var formData = {teachers: this.teachers, experts: this.experts},
                errors = {},
                infoMessage,
                warningMessage;

            this.$el.find('#name, #startDate, #finishDate').each(function (index, field) {
                formData[field.name] = field.value;
            });
            this.$el.find('#location option:selected, #direction option:selected').each(function (index, field) {
                formData[$(field).data('name')] = field.value;
            });
            this.$el.find('.budget-option').each(function (index, button) {
                if ($(button).hasClass('active')) {
                    formData['budgetOwner'] = $(button).data('value');
                }
            });

            errors = this.model.preValidate(formData);

            if (!_.isEmpty(errors)) {
                var hints = [];

                _.each(errors, function (value, key) {
                    hints.push({
                        name: key,
                        message: value
                    });
                });
                app.mediator.publish('Message', {
                    type: 'hints',
                    $el: this.$el,
                    hints: hints
                })
            } else {
                this.model.save(formData);

                if (this.model.isNew()) {
                    infoMessage = 'Group ' + this.model.get('name') + ' was created';
                } else {
                    infoMessage = 'Group ' + this.model.get('name') + ' was edited';
                }
               
                if (!formData.teachers.length && !formData.experts.length) {
                    warningMessage = 'Teachers and experts';
                } else if (!formData.teachers.length) {
                    warningMessage = 'Teachers';
                } else if (!formData.experts.length) {
                    warningMessage = 'Experts';
                }

                if (warningMessage) {
                    app.mediator.publish('Message', {
                        type: 'flash-warning',
                        text: warningMessage + ' are not specified'
                    });
                }

                app.mediator.publish('Groups: group-saved', this.model);
                app.mediator.publish('Message', {
                    type: 'flash-info',
                    text: infoMessage
                });
                this.remove();
            }
        },

        close: function () {
            $(document).off('keydown');
            this.remove();
            app.mediator.publish('Groups: dialog-closed');
        }

    });
})(CS.Groups);