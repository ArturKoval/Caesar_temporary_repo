'use strict';

(function (This, app) {
    This.ContentView = Backbone.View.extend({
        template: templates.contentTpl,

    
        initialize: function () {
            app.mediator.subscribe('Locations: selected', this.showLocationInfo.bind(this));
            app.mediator.subscribe('Groups: selected', this.showSelectedGroup.bind(this));
            app.mediator.subscribe('Groups: saved', this.showSelectedGroup.bind(this));
        },

        render: function () {
            this.$el.html(templates.contentTpl);
            this.$el.find('.groupLocation').html(app.user.get('location'));
        return this;
        },

        showSelectedGroup: function (selected) {
            this.$el.find('.groupLocation').html(selected.get('location'));
            this.$el.find('.groupName').html(selected.get('name'));
            var groupView = new This.GroupView({
                model: selected
            });

            this.$el.find('#main-section').html(groupView.render().el);
            this.$el.find('.groupStage').html(selected.get('stage'));
            this.$el.find('.groupStageTitle').html('Stage:&nbsp;');

            groupView.stubsListener('info');
            return this;
        },

        showLocationInfo: function (locations) {
            var numberOfLocations;

            if (locations.length > 1) {
                numberOfLocations = locations.length + ' ' + 'locations';
                this.$el.find('.groupLocation').html(numberOfLocations)
                    .attr({
                        'title': locations
                    });
            } else {
                this.$el.find('.groupLocation').html(locations);
            }

            this.$el.find('.groupName').empty();
            this.$el.find('.main-section').empty();
            this.$el.find('.groupStage').empty();
            this.$el.find('.groupStageTitle').html('');
        },
    });

})(CS.Groups, app);