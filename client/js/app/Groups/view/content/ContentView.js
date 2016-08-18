'use strict';

(function (This, app) {
    This.ContentView = Backbone.View.extend({
        template: templates.contentTpl,
        className: 'contentSection',

        initialize: function () {
            app.mediator.subscribe('Locations: selected', this.showLocationInfo.bind(this));
            app.mediator.subscribe('Groups: selected', this.showSelectedGroup.bind(this));
            app.mediator.subscribe('Groups: saved', this.showSelectedGroup.bind(this));
            app.mediator.subscribe('Schedule: select-month', this.showScheduleYear.bind(this));

            this.$mainSection = this.$el.find('.main-section');
        },

        render: function () {
            this.$el.html(templates.contentTpl);
			this.$groupLocation = this.$el.find('.groupLocation');
			this.$groupName = this.$el.find('.groupName');
            this.$groupStage = this.$el.find('.groupStage');
            this.$groupStageTitle = this.$el.find('.groupStageTitle');

            return this;
        },

        showSelectedGroup: function (selected) {
            this.$groupName.html(selected.get('name'));
            this.$groupStage.html(selected.get('stage'));
            this.$groupStageTitle.html('Stage:&nbsp;');

            return this;
        },

        showLocationInfo: function (locations) {
            if (locations.length > 1) {
                var numberOflocations = locations.length + ' locations';
                this.$groupLocation.html(numberOflocations);
                this.showHints(locations);

            } else {
                this.$groupLocation.html(locations[0]);
            }

            this.$groupName.empty();
            this.$el.find('.main-section').empty();
            this.$groupStage.empty();
            this.$groupStageTitle.html('');
        },

        showScheduleYear: function (year) {
            this.$groupStageTitle.html(year);
        },

        showHints: function (locations) {
            this.$groupLocation.on('mouseover', showMessage.bind(this));
            this.$groupLocation.on('mouseleave', removeMessage.bind(this));

            function showMessage () {
                 var hints = [{
                    name: 'content-header-location',
                    text: locations
                }];

                app.mediator.publish('Message', {
                    type: 'hints',
                    $el: this.$el,
                    hints: hints
                });
            }

            function removeMessage () {
                this.$el.find('.hint').remove();
                this.$groupLocation.off('mouseover', showMessage.bind(this));
                this.$groupLocation.off('mouseleave', showMessage.bind(this));
            }
        },
    });

})(CS.Groups, app);
