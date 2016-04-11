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

            Backbone.Validation.bind(this, {
                valid: function (view, attr, selector) {
                    var $el = view.$('[name=' + attr + ']'),
                        $group = $el.closest('.form-group');

                    $group.removeClass('has-error');
                    $group.find('.help-block').html('').addClass('hidden');
                },
                invalid: function (view, attr, error, selector) {
                    var $el = view.$('[name=' + attr + ']'),
                        $group = $el.closest('.form-group');

                    $group.addClass('has-error');
                    $group.find('.help-block').html(error).removeClass('hidden');
                }
            });
        },

        render: function () {
            this.teachers = this.model.get('teachers');

            var teacherView = new This.TeacherView(this.teachers);
            var model = _.extend({
                directions: i.directions,
                locations: i.locations
            }, this.model.toJSON());

            this.$el.html(this.template(model));
            this.$el.find('#teachers').html(teacherView.render().$el);

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
            var finishDate,
                courseDuration;

            if (this.$el.find('[name=direction]').val() === 'MQC') {
                courseDuration = 9 * 7;
            } else {
                courseDuration = 12 * 7;
            }

            finishDate = new Date(this.$el.find('[name=startDate]').val());

            finishDate.setDate(finishDate.getDate() + courseDuration);
            this.$el.find('[name=finishDate]').val(finishDate.toISOString().split('T')[0]);
        },

        setBudgetOwner: function () {
            this.$el.find('.budget-option').toggleClass('active disabled');
        },

        save: function () {
            var formData = {teachers: this.teachers, experts: []},
                errors = {};

            this.$el.find('input').each(function (index, field) {
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

            this.model.set(formData);

            var a = this.model.isNew();
            debugger;
            if (this.model.isValid(true)) {
                this.model.save();
                app.mediator.publish('Groups: dialog closed');
                this.close();
            }
        },

        close: function () {
            $(document).off('keydown');
            this.remove();
            app.mediator.publish('Groups: dialog closed');
        }
    });
})(CS.Groups);