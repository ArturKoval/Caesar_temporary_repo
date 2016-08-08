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
            var newExpert = this.$el.find('[name=expert]').val(),
                regExpSymbols = /^[a-zA-Z /./-]*$/;

            if (!regExpSymbols.test(newExpert)) {
                this.showHints(this, 'Special symbols are not allowed.');
            } else if (newExpert.length < 5 || newExpert.length > 20 ) {
                this.showHints(this, 'Name should be from 5 to 20 chars.');
            } else {
                this.experts.push(newExpert);
                this.renderList();
                this.renderAddBtn();
            }
        },

        removeExpert: function (event) {
            var expertIndex = this.experts.indexOf($(event.target).data('expert'));
            this.experts.splice(expertIndex,1);
            this.renderList()
        },

        showHints: function (self, message) {
            var hints = [{
                    name: 'groupSelectExpert',
                    text: message
                }];
               
            app.mediator.publish('Message', { 
                type: 'hints',
                $el: self.$el,
                hints: hints
            });
        },
    });
})(CS.Groups);