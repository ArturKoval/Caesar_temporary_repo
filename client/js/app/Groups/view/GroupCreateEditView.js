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

            this.teachers = this.model.get('teachers').slice();
            this.experts = this.model.get('experts').slice();

            this.teacherView = new This.TeacherView(this.teachers);
            this.expertView = new This.ExpertView(this.experts);

            model = _.extend({
                directions: i.directions,
                locations: i.locations,
                stages: i.stages,
                isCreate: this.model.isNew(),
                defaultLocation: app.user.get('location')
            }, this.model.toJSON());

            this.$el.html(this.template(model));
            this.$el.find('#teachers').html(this.teacherView.render().$el);
            this.$el.find('#experts').html(this.expertView.render().$el);

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

                if (this.$el.find('[name=direction]').val() === 'MQC') { //ISTQB also 9 weeks
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
            var errors = {};

            this.getFormData();

            errors = this.model.preValidate(formData);

            if (!_.isEmpty(errors)) {
                this.createHint(errors);
            } else {
                this.model.save(formData);
                app.mediator.publish('Groups: group-saved', this.model);
                this.createInfoMessage();
                this.createWarningMessage();
                this.destroy();
            }
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
        },

        getFormData: function () {
            formData = {teachers: this.teachers, experts: this.experts};

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
        },

        createHint: function (errors) {
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
        },

        createInfoMessage: function () {
            var infoMessage;

            if (this.model.isNew()) {
                infoMessage = 'Group ' + this.model.get('name') + ' was created';
            } else {
                infoMessage = 'Group ' + this.model.get('name') + ' was edited';
            }

            app.mediator.publish('Message', {
                type: 'flash-info',
                text: infoMessage
            });
        },

        createWarningMessage: function () {
            var warningMessage;

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
        }
    });
})(CS.Groups);