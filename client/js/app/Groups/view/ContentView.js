'use strict';

(function (This, app) {
    This.ContentView = Backbone.View.extend({
        template: templates.contentTpl,

    
        initialize: function () {
            app.mediator.subscribe('Locations: selected', this.showLocationInfo.bind(this));
            app.mediator.subscribe('Groups: selected', this.showSelectedGroup.bind(this));
            app.mediator.subscribe('Groups: saved', this.showSelectedGroup.bind(this));

            this.$el.html(templates.contentTpl);
            this.$groupLocation = this.$el.find('.groupLocation');
            this.$groupName = this.$el.find('.groupName');
            this.$groupStage = this.$el.find('.groupStage');
            this.$groupStageTitle = this.$el.find('.groupStageTitle');
            this.$mainSection = this.$el.find('#main-section');
        },

        render: function (location) {
            this.$groupLocation.html(location);

            return this;
        },
        showSelectedGroup: function (selected, action) {
            this.$groupLocation.html(selected.get('location'));
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
                this.$groupLocation.html(locations);
            }

            this.$groupName.empty();
            this.$mainSection.empty();
            this.$groupStage.empty();
            this.$groupStageTitle.html('');
        },

        showHints: function (locations) {
            this.$groupLocation.hover(function () {
                var hints = [{
                    name: 'groupLocation',
                    text: locations.toString()
                }];

                app.mediator.publish('Message', { 
                    type: 'hints',
                    $el: this.$el,
                    hints: hints
                });

            }.bind(this));
        },
    });

})(CS.Groups, app);