(function (This) {
    This.ExpertView = Backbone.View.extend({
        template: templates.groupExpertsTpl,

        events: {
            'click .add-expert-btn': 'renderExpertSelect',
            'click #cancelInput': 'renderAddBtn',
            'click #acceptInput': 'addExpert',
            'click .remove-expert': 'removeExpert'
        },

        initialize: function (experts) {
            this.experts = experts;
        },

        render: function () {
            this.$el.html(this.template());
            this.renderList();
            this.renderAddBtn();
            return this;
        },

        renderList: function () {
            this.$el.find('.listExpert').html(templates.groupExpertTpl({experts: this.experts}))
        },

        renderAddBtn: function () {
            this.$el.find('.add-expert').html(templates.groupMoreExpertTpl())
        },

        renderExpertSelect: function () {
            this.$el.find('.add-expert').html(templates.groupSelectExpertTpl())
        },

        addExpert: function () {
            var newExpert = this.$el.find('[name=expert]').val();
            this.experts.push(newExpert);
            this.renderList();
            this.renderAddBtn();
        },

        removeExpert: function (event) {
            var expertIndex = this.experts.indexOf($(event.target).data('expert'));
            this.experts.splice(expertIndex,1);
            this.renderList()
        }
    });
})(CS.Groups);